// Importing Playwright
const { test, expect } = require('@playwright/test');

// Test Data - Using parameterisation as number of users is small
const credentials = [
  {username: 'standard_user', password: 'secret_sauce'},
  {username: 'locked_out_user', password: 'secret_sauce'},
  {username: 'problem_user', password: 'secret_sauce'},
  {username: 'performance_glitch_user', password: 'secret_sauce'},
  {username: 'error_user', password: 'secret_sauce'},
  {username: 'visual_user', password: 'secret_sauce'}
];

// Test Definition
credentials.forEach(({ username, password }) => {
test(`login for ${username}`, async ({ page }) => {
  // Opening Page
  // Navigating
  await page.goto('https://www.saucedemo.com/');

  // Checking Title
  await expect(page).toHaveTitle(/Swag Labs/);

  // Logging in
    // Filling in Username
    await page.fill('#user-name', username);

    // Filling in Password
    await page.fill('#password', password);

    // Clicking Login button
    await page.click('#login-button');

    // Checking Navigation after login
    await page.waitForSelector('#inventory_container');
  });
});
