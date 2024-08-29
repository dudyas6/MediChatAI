const { test, expect } = require('@playwright/test');
const BASEURL = process.env.BASEURL || 'http://localhost:3000';

test.describe('Auth API Tests', () => {
  test('Login Invalid', async ({ request }) => {
    const response = await request.post(`${BASEURL}/auth/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: 'randomuser',
        password: 'randompassword',
      },
    });

    // Check that the status code is 200
    expect(response.status()).toBe(401);

    // Parse the response body as JSON
    const responseBody = await response.json();
    expect(responseBody).toEqual({
      error: 'Invalid username or password, please try again.',
    });
  });
  test('Login Valid', async ({ request }) => {
    const response = await request.post(`${BASEURL}/auth/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: 'd',
        password: 'd',
      },
    });

    // Check that the status code is 200
    expect(response.status()).toBe(200);

    // Parse the response body as JSON
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token');
    expect(responseBody.token).toBeTruthy();
  });
});
