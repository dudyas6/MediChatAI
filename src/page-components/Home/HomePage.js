// App.js

import React from "react";
import WelcomeSection from "./Welcome/WelcomeSection";
import AboutSection from "./About/AboutSection";
import ContactSection from "./Contact/ContactSection";
import ServicesSection from "./Services/ServicesSection";
import { ThemeProvider } from "@/components/Shared/ThemeContext"; // import ThemeProvider
import { useTheme } from "@/components/Shared/ThemeContext"; 
function HomePage() {
  const { isDarkMode } = useTheme();
  return (
    <ThemeProvider>
      <div className={isDarkMode? "bg-gray-800 text-white p-2":"bg-background"}>
        <div className="m-auto max-w-[1250px] px-5 md:px-16">
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
