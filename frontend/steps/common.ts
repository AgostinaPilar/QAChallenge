import { Before, After, Given } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { allureStep, allureAttach } from '../../utils/allureLogger';
import { ENV } from '../../config/env';

Before(async function (this: CustomWorld) {
  await this.init();
});

After(async function (this: CustomWorld, { result }) {
  if (result?.status === 'FAILED') {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await allureAttach('Screenshot on Failure', screenshot, 'image/png');
    const errorMsg = result.message || 'Unknown error';
    await allureAttach('Error Log', Buffer.from(errorMsg), 'text/plain');
  } else {
    const screenshot = await this.page.screenshot();
    await allureAttach('Screenshot', screenshot, 'image/png');
  }
  await this.close();
});

Given('el usuario está logueado', async function (this: CustomWorld) {
  await allureStep('Navegando a saucedemo.com', async () => {
    await this.page.goto(ENV.UI.BASE_URL);
  });
  await allureStep(`Ingresando credenciales: ${ENV.UI.USERNAME}`, async () => {
    const login = new LoginPage(this.page);
    await login.login(ENV.UI.USERNAME, ENV.UI.PASSWORD);
  });
});
