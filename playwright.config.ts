import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
  },
});
