// Importing Playwright
const { test, expect } = require('@playwright/test');

// Test Data - Using parameterisation as number of users is small
const credentials = [
  {username: 'standard_user', password: 'secret_sauce'},
  // {username: 'locked_out_user', password: 'secret_sauce'}, Ignoring locked out user in this test
  {username: 'problem_user', password: 'secret_sauce'},
  {username: 'performance_glitch_user', password: 'secret_sauce'},
  {username: 'error_user', password: 'secret_sauce'},
  {username: 'visual_user', password: 'secret_sauce'}
];

// Test Definition
credentials.forEach(({ username, password }) => {
test(`Checking Inventory Page Headers for ${username}`, async ({ page }) => {

  // Navigating
  await page.goto('https://www.saucedemo.com/');

  // Logging in
    await page.fill('#user-name', username);
    await page.fill('#password', password);
    await page.click('#login-button');

    // Checking Header
      // Menu Burger
      await page.waitForSelector('#react-burger-menu-btn');
        await page.click('#react-burger-menu-btn');

          // Checking Menu Options
          await page.waitForSelector('#inventory_sidebar_link'); // All Itens
          await page.waitForSelector('#about_sidebar_link'); // About
          await page.waitForSelector('#logout_sidebar_link'); // Logout
          await page.waitForSelector('#reset_sidebar_link'); // Reset App State
          await page.waitForSelector('#react-burger-cross-btn'); // Cross Button
            await page.click('#react-burger-cross-btn');

          // Checking Cart Icon
          await page.waitForSelector('#shopping_cart_container');

    // Checking Secondary Header
        // Defining Expected Options
        const expectedOptions =
        [
          'Name (A to Z)',
          'Name (Z to A)',
          'Price (low to high)',
          'Price (high to low)'
        ];

        // Locating Attributes
         const dropdown = page.locator('select[data-test="product-sort-container"]');

        // Defining Option Texts
        const optionTexts = await dropdown.locator('option').allTextContents();

        // Verifying Options
        expect(optionTexts).toEqual(expectedOptions);
      });
});
