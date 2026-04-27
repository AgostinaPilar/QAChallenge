import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  UI: {
    BASE_URL: process.env.UI_BASE_URL || 'https://www.saucedemo.com',
    USERNAME: process.env.UI_USERNAME || '',
    PASSWORD: process.env.UI_PASSWORD || '',
  },
  API: {
    BASE_URL: process.env.API_BASE_URL || 'https://dummyjson.com',
    USERNAME: process.env.API_USERNAME || '',
    PASSWORD: process.env.API_PASSWORD || '',
  },
};
