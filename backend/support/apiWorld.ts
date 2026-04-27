import { setWorldConstructor, World } from '@cucumber/cucumber';
import { APIRequestContext, request } from 'playwright';

export class ApiWorld extends World {
  api!: APIRequestContext;
  response!: any;
  responseBody!: any;

  async init() {
    this.api = await request.newContext({
      baseURL: 'https://dummyjson.com',
    });
  }

  async close() {
    await this.api.dispose();
  }
}

setWorldConstructor(ApiWorld);
