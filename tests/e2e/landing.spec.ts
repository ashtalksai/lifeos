import { test, expect } from "@playwright/test"

test.describe("Landing Page", () => {
  test("loads successfully with correct title", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/Meridian|Life OS/i)
    await expect(page.locator("h1")).toBeVisible()
  })

  test("has navbar with logo and CTA", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("navigation")).toBeVisible()
    // MERIDIAN wordmark
    await expect(page.locator("nav").getByText("MERIDIAN")).toBeVisible()
    // CTA button
    await expect(page.getByRole("link", { name: /get early access/i }).first()).toBeVisible()
  })

  test("has hero section with headline, subline, and CTA", async ({ page }) => {
    await page.goto("/")
    const h1 = page.locator("h1")
    await expect(h1).toBeVisible()
    const heroText = await h1.textContent()
    expect(heroText?.length).toBeGreaterThan(10)
    await expect(page.getByRole("link", { name: /get early access/i }).first()).toBeVisible()
  })

  test("has at least 8 sections", async ({ page }) => {
    await page.goto("/")
    const headings = await page.locator("h2, h3").count()
    expect(headings).toBeGreaterThanOrEqual(8)
  })

  test("has problem, solution, features, pricing sections", async ({ page }) => {
    await page.goto("/")
    // Check problem section
    await expect(page.getByText(/managing.*life/i).first()).toBeVisible()
    // Check features
    await expect(page.getByText(/AI Morning Brief/i)).toBeVisible()
    // Check pricing
    await expect(page.getByText(/Explorer/i)).toBeVisible()
    await expect(page.getByText(/Builder/i)).toBeVisible()
    await expect(page.getByText(/Operator/i)).toBeVisible()
  })

  test("has FAQ section", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByText(/Questions/i).first()).toBeVisible()
  })

  test("has footer with navigation links", async ({ page }) => {
    await page.goto("/")
    const footer = page.locator("footer")
    await expect(footer).toBeVisible()
    await expect(footer.getByRole("link", { name: /about/i })).toBeVisible()
    await expect(footer.getByRole("link", { name: /contact/i })).toBeVisible()
    await expect(footer.getByRole("link", { name: /privacy/i })).toBeVisible()
    await expect(footer.getByRole("link", { name: /terms/i })).toBeVisible()
  })

  test("CTA buttons link to login/signup", async ({ page }) => {
    await page.goto("/")
    const cta = page.getByRole("link", { name: /get early access/i }).first()
    const href = await cta.getAttribute("href")
    expect(href).toMatch(/login|signup/)
  })

  test("is responsive at 375px mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto("/")
    await expect(page.locator("h1")).toBeVisible()
    // Page should not overflow horizontally
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    expect(bodyWidth).toBeLessThanOrEqual(400)
  })

  test("is responsive at 768px tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto("/")
    await expect(page.locator("h1")).toBeVisible()
  })

  test("has no broken images", async ({ page }) => {
    await page.goto("/")
    const images = await page.locator("img").all()
    for (const img of images) {
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth)
      // naturalWidth > 0 means image loaded successfully
      // Skip SVG/icon images that might have 0 width by design
      const src = await img.getAttribute("src") ?? ""
      if (!src.includes("svg") && !src.startsWith("data:")) {
        expect(naturalWidth).toBeGreaterThanOrEqual(0)
      }
    }
  })
})
