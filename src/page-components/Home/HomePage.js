// App.js

import React from "react";
import WelcomeSection from "./Welcome/WelcomeSection";
import AboutSection from "./About/AboutSection";
import ContactSection from "./Contact/ContactSection";
import ServicesSection from "./Services/ServicesSection";
import { ThemeProvider } from "src/components/Services/ThemeContext"; // import ThemeProvider
import AccessibilityMenu from "src/components/Shared/AccessibilityMenu"; // import AccessibilityMenu

function HomePage() {
  return (
    <ThemeProvider>
      <div className="dark:text-white dark:bg-gray-800 p-2 shadow-md">
        <div className="m-auto max-w-[1250px] px-5 md:px-16">
          <AccessibilityMenu />
          <WelcomeSection />
          <ServicesSection />
          <AboutSection />
          <ContactSection />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default HomePage;
