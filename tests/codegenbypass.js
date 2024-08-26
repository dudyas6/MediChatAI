const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({
    headless: false, // Set to false to see the browser while interacting
  });

  // Create a new context with the bypass headers
  const context = await browser.newContext({
    extraHTTPHeaders: {
      'x-vercel-protection-bypass': '6j8sPNDow9HW2nmdBWnVP5WtuMYtMG1K', // Replace with your secret
      'x-vercel-set-bypass-cookie': 'true',
    },
  });

  // Open a new page in the context
  const page = await context.newPage();

  // Navigate to the website
  await page.goto('https://medichat-staging.vercel.app/');

  // Start Playwright's codegen to record actions
  await page.pause();  // This opens the codegen mode, and you can interact with the page

  // Once done, you can continue to use or modify the script as needed

  await browser.close();  // Close the browser after finishing
})();
