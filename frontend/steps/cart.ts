import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { InventoryPage } from '../pages/InventoryPage';
import { allureStep } from '../../utils/allureLogger';

When('el usuario hace click en {string} de un producto', async function (this: CustomWorld, _btn: string) {
  await allureStep(`Haciendo click en "${_btn}" del primer producto`, async () => {
    const inventory = new InventoryPage(this.page);
    await inventory.addFirstProductToCart();
  });
});

Then('el producto se agrega al carrito', async function (this: CustomWorld) {
  await allureStep('Navegando al carrito para verificar producto', async () => {
    const inventory = new InventoryPage(this.page);
    await inventory.goToCart();
  });
  await allureStep('Verificando producto visible en el carrito', async () => {
    await expect(this.page.locator('.cart_item')).toBeVisible();
  });
});

Then('el contador del carrito se actualiza', async function (this: CustomWorld) {
  await allureStep('Verificando badge del carrito', async () => {
    await expect(this.page.locator('.shopping_cart_badge')).toBeVisible();
  });
});

Given('el usuario tiene un producto en el carrito', async function (this: CustomWorld) {
  await allureStep('Agregando producto al carrito', async () => {
    const inventory = new InventoryPage(this.page);
    await inventory.addFirstProductToCart();
  });
  await allureStep('Navegando al carrito', async () => {
    const inventory = new InventoryPage(this.page);
    await inventory.goToCart();
  });
});

When('hace click en {string}', async function (this: CustomWorld, btn: string) {
  await allureStep(`Haciendo click en "${btn}"`, async () => {
    await this.page.locator('.cart_item button').first().click();
  });
});

Then('el producto se elimina del carrito', async function (this: CustomWorld) {
  await allureStep('Verificando que el producto fue eliminado', async () => {
    await expect(this.page.locator('.cart_item')).not.toBeVisible();
  });
});
