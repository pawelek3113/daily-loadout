import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should be visible and should have flex class", async ({ page }) => {
    const mainElement = page.getByRole("main");

    await expect(mainElement).toBeVisible();
    await expect(mainElement).toHaveClass(/flex/);
  });
});
