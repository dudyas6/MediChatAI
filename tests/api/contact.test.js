const { test, expect } = require('@playwright/test');
const BASEURL = process.env.BASEURL || 'http://localhost:3000';

test.describe('Add contact to DB', () => {
  test('User post contact request', async ({ request }) => {
    
    const response = await request.post(`${BASEURL}/contact/`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        name: 'randomuser',
        email: 'randomemail',
        message: 'randommessage',
      }),
    });

    // Check if the response status is 200
    expect(response.status()).toBe(200);

    // Parse the response body as JSON
    const responseBody = await response.json();
    console.log(responseBody);

    // Validate the response body
    expect(responseBody).toEqual({
      error: 'Message sent successfully!',
    });
  });
});
