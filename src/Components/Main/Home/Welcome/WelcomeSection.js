import React from "react";
import SectionWrapper from "../SectionWrapper";
import Cards from "./Cards";
import image from "Assets/Images/transparent_background.png";
import Button from "Components/UI/Button"; // Adjust the import path as per your actual file location


const HandleClick = (e) => {
  
};

function HomePage() {
  return (
    <SectionWrapper id="home">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 text-center md:text-left">
        <div className="tracking-wider md:tracking-normal max-w-xs lg:max-w-xl">
          <h1 className="lg:text-7xl text-4xl font-bold">
            Your Health Is Our Top Priority
          </h1>
          <p className="text-lg md:text-base lg:text-xl my-10">
            Securely share your comprehensive medical history and symptoms with an AI doctor,
            for easier communication and care.
          </p>
        </div>
        <div className="max-w-xs md:max-w-none">
          <img src={image} width="500px" alt="hero" />
        </div>
      </div>
      <div className="flex mt-10 px-5 py-3 text-lg">
        <Button  onClick={(HandleClick)} >Chat Now</Button>
      </div>
      <Cards />
    </SectionWrapper>
  );
}
  
export default HomePage;
