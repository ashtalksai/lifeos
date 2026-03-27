import { test, expect } from "@playwright/test"

const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 800 },
]

const publicPages = ["/", "/about", "/contact", "/privacy", "/terms", "/login"]

for (const vp of viewports) {
  test.describe(`${vp.name} (${vp.width}px)`, () => {
    for (const path of publicPages) {
      test(`${path} renders without layout break`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height })
        await page.goto(path)
        // Page should have some visible content
        await expect(page.locator("body")).toBeVisible()
        // No horizontal scroll overflow
        const scrollWidth = await page.evaluate(() => document.body.scrollWidth)
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
        // Allow small tolerance for rounding
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5)
      })
    }
  })
}

test.describe("Landing page mobile specific", () => {
  test("hero headline visible on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto("/")
    await expect(page.locator("h1")).toBeVisible()
  })

  test("pricing section visible on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto("/")
    await page.getByText(/Explorer/i).scrollIntoViewIfNeeded()
    await expect(page.getByText(/Explorer/i)).toBeVisible()
  })

  test("footer links accessible on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto("/")
    await page.locator("footer").scrollIntoViewIfNeeded()
    await expect(page.locator("footer").getByRole("link", { name: /privacy/i })).toBeVisible()
  })
})
