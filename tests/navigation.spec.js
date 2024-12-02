// Importing Playwright
const { test, expect } = require('@playwright/test');

// Test Definition
test('navigate to website', async ({ page }) => {

// Navigating
await page.goto ('https://www.saucedemo.com/');

// Checking Title
await expect (page).toHaveTitle(/Swag Labs/);
}); 
