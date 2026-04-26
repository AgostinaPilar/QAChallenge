import { When, Then, Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { allureStep } from '../utils/allureLogger';

Given('el usuario tiene productos en el carrito', async function (this: CustomWorld) {
  await allureStep('Agregando primer producto al carrito', async () => {
    await this.page.locator('.inventory_item button').first().click();
  });
  await allureStep('Navegando al carrito', async () => {
    await this.page.click('.shopping_cart_link');
  });
});

When('accede al checkout', async function (this: CustomWorld) {
  await allureStep('Haciendo click en Checkout', async () => {
    const cart = new CartPage(this.page);
    await cart.clickCheckout();
  });
});

When('completa los datos personales', async function (this: CustomWorld) {
  await allureStep('Completando formulario: Test User, ZIP 1234', async () => {
    const checkout = new CheckoutPage(this.page);
    await checkout.fillForm('Test', 'User', '1234');
    await checkout.continue();
  });
});

When('confirma la compra', async function (this: CustomWorld) {
  await allureStep('Confirmando compra con Finish', async () => {
    const checkout = new CheckoutPage(this.page);
    await checkout.finish();
  });
});

Then('la orden se procesa correctamente', async function (this: CustomWorld) {
  await allureStep('Verificando mensaje de orden completada', async () => {
    await expect(this.page.locator('.complete-header')).toBeVisible();
  });
});

Given('el usuario está en el checkout', async function (this: CustomWorld) {
  await allureStep('Agregando producto al carrito', async () => {
    await this.page.locator('.inventory_item button').first().click();
    await this.page.click('.shopping_cart_link');
  });
  await allureStep('Navegando al checkout', async () => {
    const cart = new CartPage(this.page);
    await cart.clickCheckout();
  });
});

When('deja el campo First Name vacío', async function (this: CustomWorld) {
  await allureStep('Enviando formulario con First Name vacío', async () => {
    const checkout = new CheckoutPage(this.page);
    await checkout.fillForm('', 'User', '1234');
  });
});

When('deja el campo Postal Code vacío', async function (this: CustomWorld) {
  await allureStep('Enviando formulario con Postal Code vacío', async () => {
    const checkout = new CheckoutPage(this.page);
    await checkout.fillForm('Test', 'User', '');
  });
});

When('intenta continuar', async function (this: CustomWorld) {
  await allureStep('Haciendo click en Continue', async () => {
    const checkout = new CheckoutPage(this.page);
    await checkout.continue();
  });
});

Then('se muestra un mensaje de error', async function (this: CustomWorld) {
  await allureStep('Verificando mensaje de error visible', async () => {
    await expect(this.page.locator('[data-test="error"]')).toBeVisible();
  });
});
