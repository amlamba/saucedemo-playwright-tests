// Importing Playwright
const { test, expect } = require('@playwright/test');

// Test Definition
test('login', async ({ page }) => {
  // Opening Page
  // Navigating
  await page.goto('https://www.saucedemo.com/');

  // Checking Title
  await expect(page).toHaveTitle(/Swag Labs/);

  // Logging in
    // Filling in Username
    await page.fill('#user-name', 'standard_user');

    // Filling in Password
    await page.fill('#password', 'secret_sauce');

    // Clicking Login button
    await page.click('#login-button');

    // Checking Navigation after login
    await page.waitForSelector('#inventory_container');
});
