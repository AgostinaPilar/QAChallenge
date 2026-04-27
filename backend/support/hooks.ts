import { Before, After } from '@cucumber/cucumber';
import { ApiWorld } from './apiWorld';

Before(async function (this: ApiWorld) {
  await this.init();
});

After(async function (this: ApiWorld) {
  await this.close();
});
