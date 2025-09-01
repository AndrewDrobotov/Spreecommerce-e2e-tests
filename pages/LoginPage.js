// pages/LoginPage.js
const { expect } = require('@playwright/test');

//Класс
class LoginPage  {
  constructor(page) {
    this.page = page;

    // Login form fields on /login page //властивості класу
    this.emailField = '#user_email';
    this.passwordField = '#user_password';
    this.loginButton = '#login-button';
    this.accountIcon = 'button[data-action*="slideover-account#toggle"]';
    this.rememberMeCheckbox = '#user_re member_me';

    // Result locators
    
    this.flashLogInMessage = '.flash-message';
  }


  // Perform login, Методи
  async login(email, password) {
    await this.page.goto("https://demo.spreecommerce.org/");
    await this.page.waitForLoadState("load");
    await this.page.click(this.accountIcon);
    await this.page.fill(this.emailField, email);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.loginButton);
  }

  // Assert successful login
  async assertLoginSuccess() {
    await expect(this.page.locator(this.flashLogInMessage)).toHaveText(/Signed in successfully./);
  }

  // Assert failed login
  async assertLoginFailure() {
    await expect(this.page.locator(this.flashLogInMessage)).toContainText("Invalid Email or password.");
  }
}

module.exports = { LoginPage };
