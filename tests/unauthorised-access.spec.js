// Importing Playwright
const { test, expect } = require('@playwright/test');

// Test Definition
test(`Checking unauthorised access`, async ({ page }) => {

// Navigating to Pages without logging in
// Defining Error Message Container
const errorLocator = page.locator('.error-message-container.error');

  // Inventory Page
  await page.goto('https://www.saucedemo.com/inventory.html');

    // String Validation - Creating test assuming current error message text is correct
    await expect(errorLocator).toHaveText(/access.*inventory.*logged in/);

  // Cart
  await page.goto('https://www.saucedemo.com/cart.html');

    // String Validation - Creating test assuming current error message text is correct
    await expect(errorLocator).toHaveText(/access.*cart.*logged in/);

  // Checkout - One
  await page.goto('https://www.saucedemo.com/checkout-step-one.html');

    // String Validation - Creating test assuming current error message text is correct
    await expect(errorLocator).toHaveText(/access.*checkout.*one.*logged in/);

  // Checkout -Two
  await page.goto('https://www.saucedemo.com/checkout-step-two.html');

      // String Validation - Creating test assuming current error message text is correct
      await expect(errorLocator).toHaveText(/access.*checkout.*two.*logged in/);

  // Checkout -Two
  await page.goto('https://www.saucedemo.com/checkout-complete.html');

    // String Validation - Creating test assuming current error message text is correct
    await expect(errorLocator).toHaveText(/access.*checkout.*complete.*logged in/);
  });
