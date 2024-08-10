import React from "react";
import SectionWrapper from "../SectionWrapper";
import teamMember1 from "@/assets/Images/davidasulin.jpeg";
import teamMember2 from "@/assets/Images/galdanenberg.jpeg";
import Image from 'next/image';

function AboutSection() {
  return (
    <SectionWrapper id="about">
      <h2 className="mb-10 text-4xl font-bold text-center">Who are we?</h2>
      <div className="flex flex-col items-center justify-center gap-10 lg:flex-col lg:gap-5">
        <div className="flex flex-col gap-20 sm:flex-row">
          <div className="w-40 h-auto relative block p-3 rounded-xl text-center font-[sans-serif] mx-auto mt-4">
            <Image src= {teamMember1} alt="Team Member" className="w-full rounded-full bg-color-white " />
            <h4 className="mt-4 text-sm font-bold text-gray-800 dark:text-white">David Asulin</h4>
          </div>
          <div className="w-40 h-auto relative block p-3 rounded-xl text-center font-[sans-serif] mx-auto mt-4">
          <Image src= {teamMember2} alt="Team Member" className="w-full rounded-full" />
            <h4 className="mt-4 text-sm font-bold text-gray-800 dark:text-white">Gal Danenberg</h4>
          </div>
        </div>
        <div className="mt-16">
          <p>
            Welcome to our AI Healthcare Consultant Bot, your free and
            accessible online assistant for healthcare advice. Our mission is to
            provide reliable, AI-driven health consultations to help you manage
            your health and wellness from the comfort of your home.
          </p>
          <p>
            Our AI healthcare consultant bot uses advanced machine learning
            algorithms to offer personalized health recommendations and
            guidance. While it is not a substitute for professional medical
            advice, it serves as a preliminary source of information for various
            health-related queries.
          </p>
          <p>
            We are committed to ensuring that our bot is continually updated
            with the latest medical knowledge and standards to provide you with
            the best possible service. Your privacy and security are our top
            priorities, and we adhere to strict data protection regulations to
            keep your information safe.
          </p>
          <p>
            Thank you for choosing our AI Healthcare Consultant Bot. We hope it
            helps you lead a healthier and happier life.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default AboutSection;
