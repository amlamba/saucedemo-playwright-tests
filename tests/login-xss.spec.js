const { test, expect } = require('@playwright/test');

test('XSS test on login page', async ({ page }) => {
  // Navigating to Login Page
  await page.goto('https://www.saucedemo.com/');

  // Defining Payload
  const xssPayload = "<script>alert('XSS')</script>";

  // Injecting Payload into Username field
   await page.fill('#user-name', xssPayload);

    // Filling a valid password to attempt login
    await page.fill('#password', 'secret_sauce');

    // Clicking Login button
    await page.click('#login-button');

    // Declaring Error Message Container
    const errorLocator = page.locator('.error-message-container.error');

    // String Validation - Creating test assuming current error message text is correct
    await expect(errorLocator).toBeVisible();//.toHaveText(/xss/);

    // Injecting Payload into Password field
    await page.fill('#user-name', 'standard_user');

      // Filling a valid password to attempt login
      await page.fill('#password', xssPayload);

      // Clicking Login button
      await page.click('#login-button');

      // String Validation - Creating test assuming current error message text is correct
      await expect(errorLocator).toBeVisible();//.toHaveText(/xss/);
});
