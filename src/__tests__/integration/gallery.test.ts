import { test, expect } from "@playwright/test"

test.describe("Gallery Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/gallery")
  })

  test("displays gallery title and description", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
    await expect(page.getByRole("heading", { level: 1 })).not.toBeEmpty()
  })

  test("displays gallery images", async ({ page }) => {
    const images = page.locator("img")
    await expect(images).toHaveCount(await images.count())
    await expect(images.first()).toBeVisible()
  })

  test("opens image popover on click", async ({ page }) => {
    const firstImage = page.locator("img").first()
    await firstImage.click()

    const popover = page.locator('[role="dialog"]')
    await expect(popover).toBeVisible()
  })

  test("closes image popover on close button click", async ({ page }) => {
    // Open popover
    const firstImage = page.locator("img").first()
    await firstImage.click()

    // Close popover
    const closeButton = page.getByRole("button", { name: /close/i })
    await closeButton.click()

    const popover = page.locator('[role="dialog"]')
    await expect(popover).not.toBeVisible()
  })

  test("navigates through images in popover", async ({ page }) => {
    // Open popover
    const firstImage = page.locator("img").first()
    await firstImage.click()

    // Get initial image
    const initialImage = page.locator('[role="dialog"] img').first()
    const initialSrc = await initialImage.getAttribute("src")

    // Click next button
    const nextButton = page.getByRole("button", { name: /next/i })
    await nextButton.click()

    // Check if image changed
    const newImage = page.locator('[role="dialog"] img').first()
    const newSrc = await newImage.getAttribute("src")
    expect(newSrc).not.toBe(initialSrc)
  })
})
