import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(path.dirname(''), './.env.test') });

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: 3,
  forbidOnly: true,
  workers: 1,
  reporter: 'line',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  use: {
    baseURL: `http://127.0.0.1:${process.env.PORT}`,
  },
});
