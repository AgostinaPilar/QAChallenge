import { When, Then, Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

Given('el usuario tiene productos en el carrito', async function (this: CustomWorld) {
  await this.page.locator('.inventory_item button').first().click();
  await this.page.click('.shopping_cart_link');
});

When('accede al checkout', async function (this: CustomWorld) {
  const cart = new CartPage(this.page);
  await cart.clickCheckout();
});

When('completa los datos personales', async function (this: CustomWorld) {
  const checkout = new CheckoutPage(this.page);
  await checkout.fillForm('Test', 'User', '1234');
  await checkout.continue();
});

When('confirma la compra', async function (this: CustomWorld) {
  const checkout = new CheckoutPage(this.page);
  await checkout.finish();
});

Then('la orden se procesa correctamente', async function (this: CustomWorld) {
  await expect(this.page.locator('.complete-header')).toBeVisible();
});

Given('el usuario está en el checkout', async function (this: CustomWorld) {
  await this.page.locator('.inventory_item button').first().click();
  await this.page.click('.shopping_cart_link');
  const cart = new CartPage(this.page);
  await cart.clickCheckout();
});

When('deja el campo First Name vacío', async function (this: CustomWorld) {
  const checkout = new CheckoutPage(this.page);
  await checkout.fillForm('', 'User', '1234');
});

When('deja el campo Postal Code vacío', async function (this: CustomWorld) {
  const checkout = new CheckoutPage(this.page);
  await checkout.fillForm('Test', 'User', '');
});

When('intenta continuar', async function (this: CustomWorld) {
  const checkout = new CheckoutPage(this.page);
  await checkout.continue();
});

Then('se muestra un mensaje de error', async function (this: CustomWorld) {
  await expect(this.page.locator('[data-test="error"]')).toBeVisible();
});
