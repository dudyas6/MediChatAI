import { test, expect } from '@playwright/test';
import { generateRandomLoremIpsum } from '@/components/Shared/Utils';
import { deleteUserFromDB } from '@/services/user.service';
import { connectToDatabase } from '@/api-lib/mongodb';

test.describe('Home Page', () => {
  // Navigate to the home page before each test in this describe block
  test.beforeEach(async ({ page }) => {
    await page.goto('https://medichat-staging.vercel.app/');
  });

  // Test for the Navbar section
  test('Navbar', async ({ page }) => {
    // Check that the logo is visible
    await expect(page.getByRole('img', { name: 'Logo' }).first()).toBeVisible();

    // Check that the navigation bar contains the expected text
    await expect(page.getByRole('navigation')).toContainText('Home');
    await expect(page.getByRole('navigation')).toContainText('Services');
    await expect(page.getByRole('navigation')).toContainText('About');
    await expect(page.getByRole('navigation')).toContainText('Contact');

    // Check that the user icon is visible
    await expect(page.getByRole('img', { name: 'User' })).toBeVisible();
  });

  // Test for the Home section
  test('Home section', async ({ page }) => {
    // Check that the main headline is visible
    await expect(page.locator('h1')).toContainText(
      'Your Health Is Our Top Priority'
    );

    // Check that the home section contains the expected descriptive text
    await expect(page.locator('#home')).toContainText(
      'Securely share your comprehensive medical history and symptoms with an AI doctor, for easier communication and care.'
    );

    // Check that the "Chat Now" button is visible
    await expect(page.getByRole('button', { name: 'Chat Now' })).toBeVisible();
  });

  test.describe('Services section', () => {
    // Test for the General Consultation service
    test('General Consultation', async ({ page }) => {
      // Locate the "General Consultation" service block and ensure it's visible
      const generalConsultation = page
        .locator('div')
        .filter({ hasText: /^General Consultation$/ });
      await expect(generalConsultation).toBeVisible();

      // Click on the "General Consultation" block
      await generalConsultation.click();

      // Check that the service details contain the expected text
      await expect(page.locator('#services')).toContainText(
        'Access medical advice any time of the day.'
      );
      await expect(page.locator('#services')).toContainText(
        'Enter symptoms and get an initial assessment.'
      );
      await expect(page.locator('#services')).toContainText(
        'Ask general health-related questions and receive answers.'
      );
    });

    // Test for the Mental Health Support service
    test('Mental Health Support', async ({ page }) => {
      // Locate the "Mental Health Support" service block and ensure it's visible
      const mentalHealthSupport = page
        .locator('div')
        .filter({ hasText: /^Mental Health Support$/ });
      await expect(mentalHealthSupport).toBeVisible();

      // Click on the "Mental Health Support" block
      await mentalHealthSupport.click();

      // Check that the service details contain the expected text
      await expect(page.locator('#services')).toContainText(
        'Conduct self-assessments for mental well-being.'
      );
      await expect(page.locator('#services')).toContainText(
        'Access resources and support for mental health.'
      );
      await expect(page.locator('#services')).toContainText(
        'Get immediate assistance during mental health crises.'
      );
    });

    // Test for the Specialized Services
    test('Specialized Services', async ({ page }) => {
      // Locate the "Specialized Services" block and ensure it's visible
      const specializedServices = page
        .locator('div')
        .filter({ hasText: /^Specialized Services$/ });
      await expect(specializedServices).toBeVisible();

      // Click on the "Specialized Services" block
      await specializedServices.click();

      // Check that the service details contain the expected text
      await expect(page.locator('#services')).toContainText(
        'Get second opinions on diagnoses and treatment plans.'
      );
      await expect(page.locator('#services')).toContainText(
        'Receive referrals to specialists based on health conditions.'
      );
      await expect(page.locator('#services')).toContainText(
        'Explore alternative and complementary medicine options.'
      );
    });

    // Test for general details in the Services section
    test('General Details', async ({ page }) => {
      // Check that the general services section contains the expected text
      await expect(page.locator('#services')).toContainText(
        'We Are Always Here To Ensure Best Medical Consulting'
      );
      await expect(page.locator('#services')).toContainText(
        'Easy and simple chatting'
      );
      await expect(page.locator('#services')).toContainText('24/7 Service');
      await expect(page.locator('#services')).toContainText(
        'Suitable for everyone'
      );
      await expect(page.locator('#services')).toContainText(
        'Accurate Analysis'
      );
    });
  });

  // Test for the About section
  test('About section', async ({ page }) => {
    // Navigate to the "About" section using the navigation link
    await page.getByRole('link', { name: 'About' }).click();

    // Check that the about section contains the expected text
    await expect(page.locator('#about')).toContainText('Who are we?');
    await expect(page.locator('#about')).toContainText('David Asulin');
    await expect(page.locator('#about')).toContainText('Gal Danenberg');

    // Check that the introductory text is visible
    await expect(page.getByText('Welcome to our AI Healthcare')).toBeVisible();

    // Interact with various texts to check their visibility and functionality
    await page
      .getByText(
        'Our AI healthcare consultant bot uses advanced machine learning algorithms to'
      )
      .click();
    await page.getByText('We are committed to ensuring').click();
    await page.getByText('Thank you for choosing our AI').click();
  });

  // Test for the Contact section with a random message
  test('Contact section', async ({ page }) => {
    // Array of random messages for the contact form
    const randomMessage = generateRandomLoremIpsum();

    // Navigate to the "About" section to access the contact form
    await page.getByRole('link', { name: 'About' }).click();

    // Check that the contact section is visible
    await expect(page.locator('#contact')).toContainText('Contact Us!');
    await expect(
      page
        .locator('div')
        .filter({ hasText: /^Let us know what you think!Send Message$/ })
        .nth(3)
    ).toBeVisible();

    // Fill in the contact form fields
    await expect(page.getByPlaceholder('Name')).toBeVisible();
    await expect(page.getByPlaceholder('Email')).toBeVisible();
    await expect(page.getByPlaceholder('Message')).toBeVisible();

    await page.getByPlaceholder('Name').click();
    await page.getByPlaceholder('Name').fill('David');
    await expect(page.getByPlaceholder('Name')).toHaveValue('David');

    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('david@gmail.com');
    await expect(page.getByPlaceholder('Email')).toHaveValue('david@gmail.com');

    await page.getByPlaceholder('Message').click();
    await page.getByPlaceholder('Message').fill(randomMessage);
    await expect(page.getByPlaceholder('Message')).toHaveValue(randomMessage);

    // Send the message and check for the confirmation text
    await expect(
      page.getByRole('button', { name: 'Send Message' })
    ).toBeVisible();
    await page.getByRole('button', { name: 'Send Message' }).click();
    await page.getByText("Message sent, we'll be soon").waitFor();
    await expect(page.getByText("Message sent, we'll be soon")).toBeVisible();

    // Attempt to send the message again and check for the appropriate response
    await page.getByRole('button', { name: 'Send Message' }).click();
    await expect(
      page.getByText(
        "This message has already been sent, We'll be in touch soon!"
      )
    ).toBeVisible();
  });
});

test.describe('Authentication', () => {
  // Navigate to the home page before each test in this describe block
  test.beforeEach(async ({ page }) => {
    await page.goto('https://medichat-staging.vercel.app/login');
    await connectToDatabase();
  });

  // Test for the Navbar section
  test('Invalid Login', async ({ page }) => {
    await page.getByPlaceholder('Enter username').click();
    await page.getByPlaceholder('Enter username').fill('root');
    await page.getByPlaceholder('Enter password').click();
    await page.getByPlaceholder('Enter password').fill('root');
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.locator('form')).toContainText('Login');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('form')).toContainText('Loading', {
      timeout: 10000,
    });
    await page.getByRole('button', { name: 'Login' }).waitFor();
    await expect(page.locator('form')).toContainText(
      'Invalid username or password, please try again.'
    );
  });

  test('Valid Login', async ({ page }) => {
    await page.getByPlaceholder('Enter username').click();
    await page.getByPlaceholder('Enter username').fill('d');
    await page.getByPlaceholder('Enter password').click();
    await page.getByPlaceholder('Enter password').fill('d');
    await expect(page.locator('form')).toContainText('Login');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('form')).toContainText('Loading');
    await expect(page.locator('form')).not.toContainText('Loading');
    await page.getByText('Login successful, moving to homepage').waitFor();
    await expect(page.getByText('Login successful, moving to')).toBeVisible();
    await expect(page).toHaveURL('https://medichat-staging.vercel.app/');
  });

  test('Valid Register', async ({ page }) => {
    await deleteUserFromDB('rand');
    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.getByPlaceholder('Enter username').click();
    await page.getByPlaceholder('Enter username').fill('rand');
    await expect(page.getByPlaceholder('Enter username')).toHaveValue('rand');
    await page.getByPlaceholder('Enter email address').click();
    await page.getByPlaceholder('Enter email address').fill('rand@gmail.com');
    await expect(page.getByPlaceholder('Enter email address')).toHaveValue(
      'rand@gmail.com'
    );
    await page.getByPlaceholder('Enter password').click();
    await page.getByPlaceholder('Enter password').fill('rand');
    await expect(page.getByPlaceholder('Enter password')).toHaveValue('rand');
    await page.getByPlaceholder('Enter confirm password').click();
    await page.getByPlaceholder('Enter confirm password').fill('rand');
    await expect(page.getByPlaceholder('Enter confirm password')).toHaveValue(
      'rand'
    );
    await page.getByRole('checkbox').check();
    await expect(page.getByRole('checkbox')).toBeChecked();
    await page.getByRole('button', { name: 'Create an account' }).click();
    await page.getByText('Account created successfully!').waitFor();
    await expect(page.getByText('Account created successfully!')).toBeVisible();
    await deleteUserFromDB('rand');
  });

  test('Invalid Register', async ({ page }) => {
    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.getByPlaceholder('Enter username').click();
    await page.getByPlaceholder('Enter username').fill('root');
    await expect(page.getByPlaceholder('Enter username')).toHaveValue('root');
    await page.getByPlaceholder('Enter email address').click();
    await page.getByPlaceholder('Enter email address').fill('d@gmail.com');
    await expect(page.getByPlaceholder('Enter email address')).toHaveValue(
      'd@gmail.com'
    );
    await page.getByPlaceholder('Enter password').click();
    await page.getByPlaceholder('Enter password').fill('root');
    await expect(page.getByPlaceholder('Enter password')).toHaveValue('root');
    await page.getByPlaceholder('Enter confirm password').click();
    await page.getByPlaceholder('Enter confirm password').fill('root');
    await expect(page.getByPlaceholder('Enter confirm password')).toHaveValue(
      'root'
    );
    await page.getByRole('button', { name: 'Create an account' }).click();
    await page.getByText('Please accept terms and conditions!').waitFor();
    await expect(page.getByText('Please accept terms and conditions!')).toBeVisible();
    await page.getByRole('checkbox').check();
    await expect(page.getByRole('checkbox')).toBeChecked();
    await page.getByRole('button', { name: 'Create an account' }).click();
    await page.getByText('Username already exists').waitFor();
    await expect(page.getByText('Username already exists')).toBeVisible();
  });
});
