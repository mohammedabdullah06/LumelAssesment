//npx playwright test tests/Sample.spec.js --project=chromium --headed

const { test, expect } = require('@playwright/test');

test('Register page', async ({ page }) => {

    await page.goto("https://www.flipkart.com/");
    const searchBox = page.getByPlaceholder('Search for Products, Brands and More').first();
    //const searchBox = page.getByRole('textbox', {name: 'Search for Products, Brands and More'});
    
    await searchBox.click();
    await searchBox.fill('Laptop');
    await searchBox.press('Enter');



})   