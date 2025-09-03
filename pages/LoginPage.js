// pages/LoginPage.js
const { expect } = require('@playwright/test');

class LoginPage  {
  constructor(page) {
    this.page = page;

    this.emailField = '#user_email';
    this.passwordField = '#user_password';
    this.loginButton = '#login-button';
    this.accountIcon = 'button[data-action*="slideover-account#toggle"]';
    this.rememberMeCheckbox = '#user_remember_me';

    this.flashLogInMessage = '.flash-message';
  }

  // Perform login
  // Додано параметр rememberMe
  async login(email, password, rememberMe = false) {
    await this.page.goto("https://demo.spreecommerce.org/");
    await this.page.waitForLoadState("load");
    await this.page.click(this.accountIcon);
    await this.page.fill(this.emailField, email);
    await this.page.fill(this.passwordField, password);

    if (rememberMe) {
      await this.page.check(this.rememberMeCheckbox);
    }

    await this.page.click(this.loginButton);
  }

  async assertLoginSuccess() {
    await expect(this.page.locator(this.flashLogInMessage)).toHaveText(/Signed in successfully./);
  }

  async assertLoginFailure() {
    await expect(this.page.locator(this.flashLogInMessage)).toContainText("Invalid Email or password.");
  }

  // New method for "Remember Me" test
  async assertUserStillLoggedIn() {
     await this.page.waitForSelector(this.accountIcon, { state: 'visible' }); // click account icon
    await expect(this.page).toHaveURL('https://demo.spreecommerce.org/account/orders');
  }
}

module.exports = { LoginPage };
