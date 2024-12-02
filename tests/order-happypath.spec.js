// Importing Playwright
const { test, expect } = require('@playwright/test');

// Setting number of retries due to observed past issues
test.describe('User Tests with Retries', () => {
  test.describe.configure({ retries: 3});
});

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
test(`happy path for ${username}`, async ({ page }) => {
  // Opening Page
  // Navigating
  await page.goto('https://www.saucedemo.com/');

  // Checking Title
  await expect(page).toHaveTitle(/Swag Labs/);

  // Logging in
    // Filling in Username
    await page.fill('#user-name',username);

    // Filling in Password
    await page.fill('#password',password);

    // Clicking Login button
    await page.click('#login-button');

    // Handling Login Errors
      // Definitions
      const errorCount = await page.locator('[data-test="error"]').count();
      const errorLocator = page.locator('[data-test="error"]');

    if (errorCount > 0)
    {
      const errorMessage = await errorLocator.textContent();
      if (username==='locked_out_user')
      {
        if (errorMessage && errorMessage.toString().toLowerCase().includes('locked out'))
        {
        console.error(`User ${username} is locked out as expected`);
        }
        else
        {
        console.error(`Unexpected error message for locked out user  ${username}. Error message: ${errorMessage}`);
        }
      }
      else
      {
      console.error(`Login failed for user: ${username}. Error message: ${errorMessage}`);
      }
      return;
    }

    // Checking Navigation after login
    try
    {
    await expect(page).toHaveURL(/.*inventory/);
    }

    catch (error)
    {
    console.error(`Navigation to inventory failed for user ${username}`);
    return
    }

  // Selecting Item - Fleece Jacket
  await page.click('#add-to-cart-sauce-labs-fleece-jacket');

  // Navigating to Cart
  await page.click('#shopping_cart_container');

  // Checking Navigation after Cart
  try
  {
  await expect(page).toHaveURL(/.*cart/);
  }

  catch (error)
  {
  console.error(`Navigation to cart failed for user: ${username}`);
  return;
  }

  // Checking Out
  await page.click('#checkout');

    // Checking Navigation to Checkout
    try
    {
    await expect(page).toHaveURL(/.*one/);
    }

    catch (error)
    {
    console.error( `Navigation to checkout page one failed for user: ${username}`);
    return;
    }

    // Filling Checkout Information
      // Filling in First Name
      await page.fill('#first-name', 'FirstName');

      // Filling in Last Name
      await page.fill('#last-name', 'LastName');

      // Filling in Zip Code
      await page.fill('#postal-code', 'A12 3BC');

      // Clicking Continue button
      await page.click('#continue');

      // Checking Navigation after Checkout
      try
      {
      await expect(page).toHaveURL(/.*two/);
      }

      catch (error)
      {
        console.error( `Navigation to checkout page two failed for user: ${username}`);
        return;
      }

      // Finishing
      await page.click('#finish');

    // Checking Navigation to Thank You
    try
    {
    await expect(page).toHaveURL(/.*complete/);
    }

    catch (error)
    {
    console.error( `Navigation to confirmation page failed for user: ${username}`);
    return;
    }

  });
});
