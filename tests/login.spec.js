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

});

