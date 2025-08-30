// pages/LoginPage.js
const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailField = '#spree_user_email';   // email input
    this.passwordField = '#spree_user_password'; // password input
    this.loginButton = 'input[name="commit"]';
    this.errorMessage = '.alert-error'; // error alert
    this.accountHeader = '.account-page'; // visible only after login
  }

  async goto() {
    await this.page.goto('https://demo.spreecommerce.org/login');
  }

  async login(email, password) {
    await this.page.fill(this.emailField, email);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.loginButton);
  }

  async assertLoginSuccess() {
    await expect(this.page.locator(this.accountHeader)).toBeVisible();
  }

  async assertLoginFailure() {
    await expect(this.page.locator(this.errorMessage)).toBeVisible();
  }
}

module.exports = { LoginPage };
