const { test, expect } = require('@playwright/test');
const BASEURL = process.env.BASEURL || 'http://localhost:3000';

test.describe('User API Tests', () => {
  test('Updating Password invalid', async ({ request }) => {
    const response = await request.patch(`${BASEURL}/auth/change-password`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: 'randomuser',
        newPassword: 'randompassword',
      },
    });
    expect(response.status()).toBe(404);

    // Parse the response body as JSON
    const responseBody = await response.json();
    console.log(responseBody)
    expect(responseBody).toEqual({
      error: 'User not found',
    });
  });

  test('Updating Password valid', async ({ request }) => {
    const response = await request.patch(`${BASEURL}/auth/change-password`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: 'Gal',
        newPassword: '123',
      },
    });
    expect(response.status()).toBe(200);

    // Parse the response body as JSON
    const responseBody = await response.json();
    console.log(responseBody)
    expect(responseBody).toEqual({
      message: 'Password updated successfully',
    });
  });
});