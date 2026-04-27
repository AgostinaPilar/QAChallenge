import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async addFirstProductToCart() {
    await this.page.locator('.inventory_item button').first().click();
  }

  async removeFirstProduct() {
    await this.page.locator('.inventory_item button').first().click();
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }

  async sortBy(option: string) {
    await this.page.selectOption('.product_sort_container', option);
  }
}