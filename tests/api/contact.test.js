const { test, expect } = require('@playwright/test');
const BASEURL = process.env.BASEURL || 'http://localhost:3000';
import {deleteContactFromDB} from "@/services/contact.service"

test.describe('Add contact to DB', () => {
  test('Valid user post contact request', async ({ request }) => {
    
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
    // Validate the response body
    expect(responseBody).toEqual(
    'Message sent successfully!'
    );
    await deleteContactFromDB();
  });

    test('contact already have been sent', async ({ request }) => {
    
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
      // //send again
      // response = await request.post(`${BASEURL}/contact/`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   data: JSON.stringify({
      //     name: 'randomuser',
      //     email: 'randomemail',
      //     message: 'randommessage',
      //   }),
      // });
      // Check if the response status is 400
      expect(response.status()).toBe(400);
  
      // Parse the response body as JSON
      const responseBody = await response.json();
      // Validate the response body
      expect(responseBody).toEqual({
      error: "This message has already been sent, We'll be in touch soon!",
      }
      );
      await deleteContactFromDB();
    });
  });

