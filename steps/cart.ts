import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

When('el usuario hace click en {string} de un producto', async function (this: CustomWorld, _btn: string) {
  const inventory = new InventoryPage(this.page);
  await inventory.addFirstProductToCart();
});

Then('el producto se agrega al carrito', async function (this: CustomWorld) {
  const inventory = new InventoryPage(this.page);
  await inventory.goToCart();
  await expect(this.page.locator('.cart_item')).toBeVisible();
});

Then('el contador del carrito se actualiza', async function (this: CustomWorld) {
  await expect(this.page.locator('.shopping_cart_badge')).toBeVisible();
});

Given('el usuario tiene un producto en el carrito', async function (this: CustomWorld) {
  const inventory = new InventoryPage(this.page);
  await inventory.addFirstProductToCart();
  await inventory.goToCart();
});

When('hace click en {string}', async function (this: CustomWorld, btn: string) {
  if (btn === 'Remove') {
    await this.page.locator('.cart_item button').first().click();
  } else if (btn === 'Back to products') {
    await this.page.click('[data-test="back-to-products"]');
  }
});

Then('el producto se elimina del carrito', async function (this: CustomWorld) {
  await expect(this.page.locator('.cart_item')).not.toBeVisible();
});

When('el usuario agrega múltiples productos', async function (this: CustomWorld) {
  const buttons = this.page.locator('.inventory_item button');
  await buttons.nth(0).click();
  await buttons.nth(1).click();
});

Then('el carrito muestra la cantidad correcta de productos', async function (this: CustomWorld) {
  await expect(this.page.locator('.shopping_cart_badge')).toHaveText('2');
});

When('el usuario hace click en el icono del carrito', async function (this: CustomWorld) {
  await this.page.click('.shopping_cart_link');
});

Then('se muestra la página del carrito', async function (this: CustomWorld) {
  await expect(this.page.locator('.cart_list')).toBeVisible();
});
