import { test, expect } from "@playwright/test";

test.describe("Responsive UI Elements", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a document
    await page.goto("/#003.docx");
    await page.waitForSelector('[data-testid="app-title"]');
  });

  test("should show Read button label on all screen sizes", async ({ page }) => {
    // Test mobile size
    await page.setViewportSize({ width: 375, height: 667 });

    // Find the Read button
    const readButton = await page.$('button:has-text("Read")');
    expect(readButton).toBeTruthy();

    // The Read text should be visible
    const readText = await readButton?.$('span:has-text("Read")');
    expect(readText).toBeTruthy();
    expect(await readText?.isVisible()).toBe(true);

    // Test desktop size - Read button should still show label
    await page.setViewportSize({ width: 1024, height: 768 });

    const desktopReadButton = await page.$('button:has-text("Read")');
    expect(desktopReadButton).toBeTruthy();

    const desktopReadText = await desktopReadButton?.$('span:has-text("Read")');
    expect(desktopReadText).toBeTruthy();
    expect(await desktopReadText?.isVisible()).toBe(true);
  });

  test("View and Read buttons should have consistent styling", async ({ page }) => {
    // Find both buttons
    const viewButton = await page.$('button:has-text("View")');
    const readButton = await page.$('button:has-text("Read")');

    expect(viewButton).toBeTruthy();
    expect(readButton).toBeTruthy();

    // Both should have text visible at all times
    const viewText = await viewButton?.$('span:has-text("View")');
    const readText = await readButton?.$('span:has-text("Read")');

    expect(await viewText?.isVisible()).toBe(true);
    expect(await readText?.isVisible()).toBe(true);

    // Both should have consistent padding and styling
    const viewClasses = await viewButton?.getAttribute("class");
    const readClasses = await readButton?.getAttribute("class");

    // Check for consistent padding classes
    expect(viewClasses).toContain("px-2 sm:px-3 lg:px-4");
    expect(readClasses).toContain("px-2 sm:px-3 lg:px-4");
  });
});
