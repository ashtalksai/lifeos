import { test, expect } from "@playwright/test"

test.describe("Public Pages", () => {
  test("about page loads with real content", async ({ page }) => {
    await page.goto("/about")
    await expect(page.locator("h1, h2")).toBeVisible()
    const bodyText = await page.locator("body").textContent()
    // Should have real content, not lorem ipsum
    expect(bodyText).not.toContain("Lorem ipsum")
    expect(bodyText?.length).toBeGreaterThan(200)
  })

  test("about page has Meridian/Ash Hatef content", async ({ page }) => {
    await page.goto("/about")
    await expect(page.getByText(/Meridian|Ash Hatef|ChimeStream/i).first()).toBeVisible()
  })

  test("contact page loads with form", async ({ page }) => {
    await page.goto("/contact")
    await expect(page.getByRole("heading")).toBeVisible()
    await expect(page.locator("form, input[type=email]")).toBeVisible()
  })

  test("contact page has send button", async ({ page }) => {
    await page.goto("/contact")
    await expect(page.getByRole("button", { name: /send/i })).toBeVisible()
  })

  test("privacy page loads with policy content", async ({ page }) => {
    await page.goto("/privacy")
    await expect(page.getByRole("heading", { name: /privacy/i })).toBeVisible()
    const bodyText = await page.locator("body").textContent()
    expect(bodyText).not.toContain("Lorem ipsum")
  })

  test("terms page loads with service content", async ({ page }) => {
    await page.goto("/terms")
    await expect(page.getByRole("heading", { name: /terms/i })).toBeVisible()
    const bodyText = await page.locator("body").textContent()
    expect(bodyText).not.toContain("Lorem ipsum")
  })

  test("health endpoint returns ok", async ({ request }) => {
    const response = await request.get("/api/health")
    expect(response.status()).toBe(200)
    const data = await response.json()
    expect(data.status).toBe("ok")
  })
})

test.describe("Public Pages Navigation", () => {
  test("about page has navbar with logo", async ({ page }) => {
    await page.goto("/about")
    await expect(page.getByText("MERIDIAN").first()).toBeVisible()
  })

  test("about page has footer", async ({ page }) => {
    await page.goto("/about")
    await expect(page.locator("footer")).toBeVisible()
  })

  test("privacy page links back to other pages", async ({ page }) => {
    await page.goto("/privacy")
    const footerLinks = page.locator("footer a")
    const count = await footerLinks.count()
    expect(count).toBeGreaterThan(0)
  })
})
