import { When } from '@cucumber/cucumber';
import { ApiWorld } from '../support/apiWorld';
import { allureStep, allureAttach } from '../../utils/allureLogger';

let accessToken: string;

When('el usuario se autentica con usuario {string} y password {string}', async function (this: ApiWorld, user: string, pass: string) {
  await allureStep(`Enviando POST /auth/login con usuario: ${user}`, async () => {
    this.response = await this.api.post('/auth/login', {
      data: { username: user, password: pass, expiresInMins: 30 },
    });
    this.responseBody = await this.response.json();
  });
  await allureStep(`Response status: ${this.response.status()}`, async () => {
    await allureAttach('Response Body', Buffer.from(JSON.stringify(this.responseBody, null, 2)), 'application/json');
  });
  accessToken = this.responseBody.accessToken;
});

When('se envía un GET autenticado a {string}', async function (this: ApiWorld, endpoint: string) {
  await allureStep(`Enviando GET autenticado ${endpoint}`, async () => {
    this.response = await this.api.get(endpoint, {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
    this.responseBody = await this.response.json();
  });
  await allureStep(`Response status: ${this.response.status()}`, async () => {
    await allureAttach('Response Body', Buffer.from(JSON.stringify(this.responseBody, null, 2)), 'application/json');
  });
});
