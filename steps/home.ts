import { When, Then, Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { InventoryPage } from '../pages/InventoryPage';

When('el usuario hace click en un producto', async function (this: CustomWorld) {
  await this.page.locator('.inventory_item_name').first().click();
});

Then('se muestra la pantalla de detalle del producto', async function (this: CustomWorld) {
  await expect(this.page.locator('.inventory_details')).toBeVisible();
});

Given('el usuario está en el detalle de un producto', async function (this: CustomWorld) {
  await this.page.locator('.inventory_item_name').first().click();
});

Then('regresa al listado de productos', async function (this: CustomWorld) {
  await expect(this.page.locator('.inventory_list')).toBeVisible();
});

When('el usuario selecciona {string}', async function (this: CustomWorld, option: string) {
  const inventory = new InventoryPage(this.page);
  await inventory.sortBy('lohi');
});

Then('los productos se ordenan de menor a mayor precio', async function (this: CustomWorld) {
  const prices = await this.page.locator('.inventory_item_price').allTextContents();
  const nums = prices.map(p => parseFloat(p.replace('$', '')));
  for (let i = 1; i < nums.length; i++) {
    expect(nums[i]).toBeGreaterThanOrEqual(nums[i - 1]);
  }
});
