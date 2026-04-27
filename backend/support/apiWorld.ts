import { setWorldConstructor, World } from '@cucumber/cucumber';
import { APIRequestContext, request } from 'playwright';
import { ENV } from '../../config/env';

export class ApiWorld extends World {
  api!: APIRequestContext;
  response!: any;
  responseBody!: any;

  async init() {
    this.api = await request.newContext({
      baseURL: ENV.API.BASE_URL,
    });
  }

  async close() {
    await this.api.dispose();
  }
}

setWorldConstructor(ApiWorld);
