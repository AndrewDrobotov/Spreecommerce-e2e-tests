const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;

    this.shopAllButton = page.getByLabel('Top').getByRole('link', { name: 'Shop All' });
    this.firstProduct = '.product-card';
    this.sizeDropdown = '#option-23-value';
    this.sizeOptions = 'label[for^="product-option-"]';
    this.addToCartButton = 'button.add-to-cart-button';
    this.cartIcon = 'a[href="/cart"]'; // іконка кошика для перевірки
    this.cartItem = '.cart-item'; // елемент у кошику
    this.cartTitle = 'span.text-xl.font-medium.uppercase.leading-none'; 
  }

  async goToShopAll() {
    await this.page.click(this.shopAllButton);
  }

  async selectFirstProduct() {
    await this.page.click(this.firstProduct);
  }

  async chooseFirstSize() {
    await this.page.click(this.sizeDropdown);
    const firstOption = await this.page.locator(this.sizeOptions).first();
    await firstOption.click();
  }

  async addToCart() {
    await this.page.click(this.addToCartButton);
  }

 async chooseSizeByIndex(index) {
  await this.page.click(this.sizeDropdown);
  const options = await this.page.$$(this.sizeOptions);
  if (options.length > index) {
    await options[index].click();
  }
}

//new method for Cart
   async waitForCartPage() {
    await this.page.waitForSelector(this.cartTitle, { state: 'visible', timeout: 10000 });
}

  }


module.exports = { CartPage };