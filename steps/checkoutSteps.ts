import { When, Then, Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

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

// NEGATIVO

Given('el usuario está en el checkout', async function (this: CustomWorld) {
  const cart = new CartPage(this.page);
  await cart.clickCheckout();
});

When('deja el First Name vacío', async function (this: CustomWorld) {
  const checkout = new CheckoutPage(this.page);
  await checkout.fillForm('', 'User', '1234');
});

When('intenta continuar', async function (this: CustomWorld) {
  const checkout = new CheckoutPage(this.page);
  await checkout.continue();
});

Then('se muestra un error', async function (this: CustomWorld) {
  await expect(this.page.locator('[data-test="error"]')).toBeVisible();
});
