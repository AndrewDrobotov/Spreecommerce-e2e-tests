// tests/cart.spec.js
const { test } = require('@playwright/test');
const { CartPage } = require('../pages/CartPage');

test.describe('Cart Tests', () => {

  test('should add first product with third size to cart', async ({ page }) => {
    const cartPartPage = new Cage(page);

    // Go to main page
    await page.goto('https://demo.spreecommerce.org/');

    await cartPage.shopAllButton.click();
    await cartPage.selectFirstProduct();
    await cartPage.chooseSizeByIndex(2); // індексація з 0
    await cartPage.addToCart();
    await cartPage.waitForCartPage();
  });

});
