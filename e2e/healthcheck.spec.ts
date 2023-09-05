import { expect, test } from '@playwright/test';

test('health check', async ({ request }) => {
  const response = await request.get('/api-docs');

  expect(response.ok()).toBeTruthy();
});
