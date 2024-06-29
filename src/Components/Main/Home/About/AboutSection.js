import React, { useState } from "react";
import SectionWrapper from "../SectionWrapper";

function AboutSection() {
  return (
    <SectionWrapper id="services">
      <h2 className="text-4xl font-bold text-center mb-10">Who are we?</h2>
      <div className="flex flex-col justify-center items-center lg:flex-col gap-10 lg:gap-5">
          <div className="flex flex-row gap-20">
            <div class="w-40 h-auto relative block bg-gray-100 p-3 rounded-xl text-center font-[sans-serif] mx-auto mt-4">
                <img
                  src="https://readymadeui.com/team-6.webp"
                  class="w-full rounded-xl"
                />
                <h4 class="text-sm text-gray-800 mt-4 font-bold">David Asulin</h4>
              </div>
              <div class="w-40 h-auto relative block bg-gray-100 p-3 rounded-xl text-center font-[sans-serif] mx-auto mt-4">
                <img
                  src="https://readymadeui.com/team-6.webp"
                  class="w-full rounded-xl"
                />
                <h4 class="text-sm text-gray-800 mt-4 font-bold">Gal Danenberg</h4>
            </div>
          </div>
          <div className="mt-16">
          <p>Welcome to our AI Healthcare Consultant Bot, your free and accessible online assistant for healthcare advice. Our mission is to provide reliable, AI-driven health consultations to help you manage your health and wellness from the comfort of your home.</p>
          <p>Our AI healthcare consultant bot uses advanced machine learning algorithms to offer personalized health recommendations and guidance. While it is not a substitute for professional medical advice, it serves as a preliminary source of information for various health-related queries.</p>
          <p>We are committed to ensuring that our bot is continually updated with the latest medical knowledge and standards to provide you with the best possible service. Your privacy and security are our top priorities, and we adhere to strict data protection regulations to keep your information safe.</p>
          <p>Thank you for choosing our AI Healthcare Consultant Bot. We hope it helps you lead a healthier and happier life.</p>
                   
          </div>
      </div>
    </SectionWrapper>
  );
}

export default AboutSection;
