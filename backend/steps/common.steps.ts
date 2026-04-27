import { Then } from '@cucumber/cucumber';
import { ApiWorld } from '../support/apiWorld';
import { expect } from '@playwright/test';
import { allureStep } from '../../utils/allureLogger';

Then('el response status es {int}', async function (this: ApiWorld, status: number) {
  await allureStep(`Verificando status code = ${status}`, async () => {
    expect(this.response.status()).toBe(status);
  });
});

Then('el response contiene un {string}', async function (this: ApiWorld, field: string) {
  await allureStep(`Verificando que response contiene "${field}"`, async () => {
    expect(this.responseBody).toHaveProperty(field);
  });
});

Then('el response contiene el campo {string}', async function (this: ApiWorld, field: string) {
  await allureStep(`Verificando campo "${field}" presente en response`, async () => {
    expect(this.responseBody).toHaveProperty(field);
  });
});

Then('el response contiene una lista de {string}', async function (this: ApiWorld, field: string) {
  await allureStep(`Verificando que "${field}" es una lista no vacía`, async () => {
    expect(this.responseBody).toHaveProperty(field);
    expect(Array.isArray(this.responseBody[field])).toBe(true);
    expect(this.responseBody[field].length).toBeGreaterThan(0);
  });
});

Then('el response contiene el campo {string} con valor {string}', async function (this: ApiWorld, field: string, value: string) {
  await allureStep(`Verificando "${field}" = "${value}"`, async () => {
    const actual = String(this.responseBody[field]);
    expect(actual).toBe(value);
  });
});
