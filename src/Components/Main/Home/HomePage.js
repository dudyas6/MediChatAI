// App.js

import React from "react";
import WelcomeSection from "./Welcome/WelcomeSection";
import AboutSection from "./About/AboutSection";
import ContactSection from "./Contact/ContactSection";
import ServicesSection from "./Services/ServicesSection";

function HomePage() {
  
  return (
    <div className="m-auto max-w-[1250px] px-5 md:px-16">
        <WelcomeSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
    </div>

  );
}

export default HomePage;
