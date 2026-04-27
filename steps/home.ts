import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { allureStep } from '../utils/allureLogger';

When('el usuario hace click en un producto', async function (this: CustomWorld) {
  await allureStep('Haciendo click en el primer producto', async () => {
    await this.page.locator('.inventory_item_name').first().click();
  });
});

Then('se muestra la pantalla de detalle del producto', async function (this: CustomWorld) {
  await allureStep('Verificando pantalla de detalle', async () => {
    await expect(this.page.locator('.inventory_details_container')).toBeVisible();
  });
});


