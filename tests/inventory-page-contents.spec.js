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

// Image Data
const images = [
  { selector: '#item_4_img_link img', expectedSrc: '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg' }, // Backpack
  { selector: '#item_0_img_link img', expectedSrc: '/static/media/bike-light-1200x1500.37c843b0.jpg' }, // Bike Light
  { selector: '#item_1_img_link img', expectedSrc: '/static/media/bolt-shirt-1200x1500.c2599ac5.jpg' }, // T-Shirt
  { selector: '#item_5_img_link img', expectedSrc: '/static/media/sauce-pullover-1200x1500.51d7ffaf.jpg' }, // Fleece Jacket
  { selector: '#item_2_img_link img', expectedSrc: '/static/media/red-onesie-1200x1500.2ec615b2.jpg' }, // Onesie
  { selector: '#item_3_img_link img', expectedSrc: '/static/media/red-tatt-1200x1500.30dadef4.jpg' }  // Red T-Shirt
]

// Test Definition
credentials.forEach(({ username, password }) => {
test(`Checking Inventory Page Contents for ${username}`, async ({ page }) => {

  // Navigating
  await page.goto('https://www.saucedemo.com/');

  // Logging in
    await page.fill('#user-name', username);
    await page.fill('#password', password);
    await page.click('#login-button');

    // Inventory Section
    await page.waitForSelector('#inventory_container');

      // Backpack
        await page.waitForSelector('#item_4_img_link'); // Backpack Image
        await page.waitForSelector('#item_4_title_link'); // Backpack Link
        // Ignoring Item Description and Price as it is just hard-coded text
        await page.waitForSelector('#add-to-cart-sauce-labs-backpack'); // Add to Cart Button - Backpack

      // Bike Light
        await page.waitForSelector('#item_0_img_link'); // Bike Light Image
        await page.waitForSelector('#item_0_title_link'); // Bike Light Link
        // Ignoring Item Description and Price as it is just hard-coded text
        await page.waitForSelector('#add-to-cart-sauce-labs-bike-light'); // Add to Cart Button - Bike Light

      // T-Shirt
        await page.waitForSelector('#item_1_img_link'); // T-Shirt Image
        await page.waitForSelector('#item_1_title_link'); // T-Shirt Link
        // Ignoring Item Description and Price as it is just hard-coded text
        await page.waitForSelector('#add-to-cart-sauce-labs-bolt-t-shirt'); // Add to Cart Button - T-Shirt

      // Fleece Jacket
        await page.waitForSelector('#item_5_img_link'); // Fleece Jacket Image
        await page.waitForSelector('#item_5_title_link'); // Fleece Jacket Link
        // Ignoring Item Description and Price as it is just hard-coded text
        await page.waitForSelector('#add-to-cart-sauce-labs-fleece-jacket'); // Add to Cart Button - Fleece Jacket

      // Onesie
        await page.waitForSelector('#item_2_img_link'); // Onesie Image
        await page.waitForSelector('#item_2_title_link'); // Onesie Link
        // Ignoring Item Description and Price as it is just hard-coded text
        await page.waitForSelector('#add-to-cart-sauce-labs-onesie'); // Add to Cart Button - Onesie

      // Red T-Shirt
        await page.waitForSelector('#item_3_img_link'); // Red T-Shirt Image
        await page.waitForSelector('#item_3_title_link'); // Red T-Shirt Link
        // Ignoring Item Description and Price as it is just hard-coded text
        await page.waitForSelector('#add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)'); // Add to Cart Button - Red T-Shirt

      // Verifying Image Sources
      for (const { selector, expectedSrc } of images)
      {
      const imageSrc = await page.getAttribute(selector, 'src');
      expect(imageSrc).toBe(expectedSrc);
      }

        });
  });
