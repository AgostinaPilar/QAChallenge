import { When } from '@cucumber/cucumber';
import { ApiWorld } from '../support/apiWorld';
import { allureStep, allureAttach } from '../../utils/allureLogger';

When('se envía un GET a {string}', async function (this: ApiWorld, endpoint: string) {
  await allureStep(`Enviando GET ${endpoint}`, async () => {
    this.response = await this.api.get(endpoint);
    this.responseBody = await this.response.json();
  });
  await allureStep(`Response status: ${this.response.status()}`, async () => {
    await allureAttach('Response Body', Buffer.from(JSON.stringify(this.responseBody, null, 2)), 'application/json');
  });
});

When('se envía un POST a {string} con body:', async function (this: ApiWorld, endpoint: string, body: string) {
  const parsed = JSON.parse(body);
  await allureStep(`Enviando POST ${endpoint} con body: ${JSON.stringify(parsed)}`, async () => {
    this.response = await this.api.post(endpoint, {
      data: parsed,
      headers: { 'Content-Type': 'application/json' },
    });
    this.responseBody = await this.response.json();
  });
  await allureStep(`Response status: ${this.response.status()}`, async () => {
    await allureAttach('Response Body', Buffer.from(JSON.stringify(this.responseBody, null, 2)), 'application/json');
  });
});
