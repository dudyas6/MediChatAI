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
            <p>Enter Some Text </p>
          </div>
      </div>
    </SectionWrapper>
  );
}

export default AboutSection;
