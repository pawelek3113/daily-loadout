import { expect, test } from "@playwright/test";

test.describe("Auth", () => {
  test("user can sign up, OTP input is visible", async ({ page, request }) => {
    const email = `test-${crypto.randomUUID()}@example.com`;

    await page.goto("http://localhost:3000/");
    await page.getByRole("link", { name: "sign up" }).click();
    await page
      .getByRole("textbox", { name: "AmazingJoe" })
      .fill("Example user");
    await page.getByRole("textbox", { name: "Name Email" }).fill(email);
    await page.getByRole("textbox", { name: "Password" }).fill("qwerty123#A");
    await page.getByRole("button", { name: "Sign up" }).click();

    await page.waitForURL("/verify");

    const codeInput = page.getByRole("textbox", { name: "Code" });
    await expect(codeInput).toBeVisible();

    let otp: string | null = null;

    await expect
      .poll(
        async () => {
          const res = await request.get(
            `/api/test/verification-code?email=${encodeURIComponent(email)}`
          );
          const data = await res.json();
          otp = data.otp;
          return data.otp;
        },
        {
          message: "waiting for OTP to be stored",
          timeout: 5000,
        }
      )
      .not.toBeNull();

    if (!otp) throw new Error("OTP was not retrieved");

    await codeInput.fill(otp);
    await expect(codeInput).toHaveValue(otp);
    await page.getByRole("button", { name: "Verify" }).click();
    await expect(page).toHaveURL("/");
  });
});
