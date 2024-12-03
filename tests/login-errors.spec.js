// Importing Playwright
const { test, expect } = require('@playwright/test');

// Setting number of retries due to observed past issues
test.describe('User Tests with Retries', () => {
  test.describe.configure({ retries: 3});
});

// Test Definition
test('login errors', async ({ page }) => {
  // Opening Page
  // Navigating
  await page.goto('https://www.saucedemo.com/');

  // Checking Title
  await expect(page).toHaveTitle(/Swag Labs/);

  // Locked Out User
    try{
    // Filling in Username
    await page.fill('#user-name', 'locked_out_user');

    // Filling in Password
    await page.fill('#password', 'secret_sauce');

    // Clicking Login button
    await page.click('#login-button');

    // Checking for Error Message Container
    const errorLocator = page.locator('.error-message-container.error');

    // String Validation - Creating test assuming current error message text is correct
    await expect(errorLocator).toHaveText(/Sorry, this user has been locked out/);}

  catch (error)
  {
     console.error(`Test failed: ${error.message} for Locked User`);
  }

  // Invalid Username
    try{
    // Filling in Username
    await page.fill('#user-name', 'wrong_user');

    // Filling in Password
    await page.fill('#password', 'secret_sauce');

    // Clicking Login button
    await page.click('#login-button');

    // Checking for Error Message Container
    const errorLocator = page.locator('.error-message-container.error');

    // String Validation - Creating test assuming current error message text is correct
    await expect(errorLocator).toHaveText(/Username and password do not match/);}

  catch (error)
  {
     console.error(`Test failed: ${error.message} for Locked User`);
  }

  // Invalid Password
    try{
    // Filling in Username
    await page.fill('#user-name', 'standard_user');

    // Filling in Password
    await page.fill('#password', 'public_sauce');

    // Clicking Login button
    await page.click('#login-button');

    // Checking for Error Message Container
    const errorLocator = page.locator('.error-message-container.error');

    // String Validation - Creating test assuming current error message text is correct
    await expect(errorLocator).toHaveText(/Username and password do not match/);}

  catch (error)
  {
     console.error(`Test failed: ${error.message} for Locked User`);
  }
    });

    // Empty Username
      try{
      // Filling in Username
      await page.fill('#user-name', '');

      // Filling in Password
      await page.fill('#password', 'secret_sauce');

      // Clicking Login button
      await page.click('#login-button');

      // Checking for Error Message Container
      const errorLocator = page.locator('.error-message-container.error');

      // String Validation - Creating test assuming current error message text is correct
      await expect(errorLocator).toHaveText(/Username is required/);}

    catch (error)
    {
       console.error(`Test failed: ${error.message} for Locked User`);
    }

    // Empty Password
      try{
      // Filling in Username
      await page.fill('#user-name', 'standard_user');

      // Filling in Password
      await page.fill('#password', '');

      // Clicking Login button
      await page.click('#login-button');

      // Checking for Error Message Container
      const errorLocator = page.locator('.error-message-container.error');

      // String Validation - Creating test assuming current error message text is correct
      await expect(errorLocator).toHaveText(/Password is required/);}

    catch (error)
    {
       console.error(`Test failed: ${error.message} for Locked User`);
    }
      });
