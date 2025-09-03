// tests/login.spec.js
const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { users } = require('../utils/testData');

test.describe('Login Tests', () => {

  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.valid.email, users.valid.password);
    await loginPage.assertLoginSuccess();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.invalid.email, users.invalid.password);
    await loginPage.assertLoginFailure();
  });

  test('should stay logged in when "Remember Me" is checked', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Perform login with "Remember Me" checked
    await loginPage.login(users.valid.email, users.valid.password, true);
    await loginPage.assertLoginSuccess();

    // Reload page
    await page.reload();

    // Re-locate account button after reload

    const accountSelector = 'button[data-action*="slideover-account#toggle"], div.hidden.lg\\:flex > a[href="/account"]';
    await page.waitForSelector(accountSelector, { state: 'visible' });
    await page.click(accountSelector);

    // Verify user is still logged in by checking account URL
    await page.waitForURL('**/account/orders');
  });

});
