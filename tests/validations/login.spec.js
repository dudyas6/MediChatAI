import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://medichat-staging.vercel.app/');
  await page.getByRole('img', { name: 'User' }).click();
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('root');
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('root');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('form')).toContainText('Invalid username or password, please try again.');
});
