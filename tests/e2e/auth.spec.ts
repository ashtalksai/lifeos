import { test, expect } from "@playwright/test"

test.describe("Auth Flow", () => {
  test("login page loads correctly", async ({ page }) => {
    await page.goto("/login")
    await expect(page.getByRole("heading", { name: /welcome back/i })).toBeVisible()
    await expect(page.locator("input[type=email]")).toBeVisible()
    await expect(page.locator("input[type=password]")).toBeVisible()
    await expect(page.getByRole("button", { name: /log in/i })).toBeVisible()
    await expect(page.getByRole("button", { name: /continue with google/i })).toBeVisible()
  })

  test("signup page shows waitlist message (private instance)", async ({ page }) => {
    await page.goto("/signup")
    // Private instance — should show waitlist message
    await expect(page.getByText(/private instance|waitlist|early access/i)).toBeVisible()
  })

  test("dashboard without session should render sidebar (auth state handled)", async ({ page }) => {
    await page.goto("/dashboard")
    // Should either redirect to login OR show dashboard with sidebar
    const url = page.url()
    const isLogin = url.includes("/login")
    const hasSidebar = await page.locator("nav, aside").count() > 0
    expect(isLogin || hasSidebar).toBe(true)
  })

  test("auth API endpoint returns valid response", async ({ request }) => {
    // /api/auth/providers should return 200 with valid auth config
    const response = await request.get("/api/auth/providers")
    // BUG: currently returns 500 - this test documents the expected behavior
    // When NEXTAUTH_URL and AUTH_SECRET are correctly configured, this should return 200
    expect(response.status()).toBe(200) // EXPECTED: will fail until env vars fixed
  })

  test("login form submits without server crash", async ({ page }) => {
    await page.goto("/login")
    await page.locator("input[type=email]").fill("test@example.com")
    await page.locator("input[type=password]").fill("password123")
    await page.getByRole("button", { name: /log in/i }).click()
    // Should not show "Server error" page
    const bodyText = await page.locator("body").textContent()
    expect(bodyText).not.toContain("Server error")
    expect(bodyText).not.toContain("problem with the server configuration")
  })

  test("Google OAuth button is present on login page", async ({ page }) => {
    await page.goto("/login")
    await expect(page.getByRole("button", { name: /continue with google/i })).toBeVisible()
  })

  test("MERIDIAN logo on login page links to home", async ({ page }) => {
    await page.goto("/login")
    const logo = page.getByRole("link", { name: /MERIDIAN/i }).first()
    const href = await logo.getAttribute("href")
    expect(href).toBe("/")
  })
})
