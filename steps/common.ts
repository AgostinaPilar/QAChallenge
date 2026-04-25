import { Before, After, Given } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';

Before(async function (this: CustomWorld) {
  await this.init();
});

After(async function (this: CustomWorld) {
  await this.close();
});

Given('el usuario está logueado', async function (this: CustomWorld) {
  const login = new LoginPage(this.page);

  await this.page.goto('https://www.saucedemo.com/');
  await login.login('standard_user', 'secret_sauce');
});