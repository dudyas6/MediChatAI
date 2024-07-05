import React from "react";
import { useNavigate } from "react-router-dom";
import SectionWrapper from "../SectionWrapper";
import Cards from "./Cards";
import image from "Assets/Images/transparent_background.png";
import Button from "Components/UI/Button"; // Adjust the import path as per your actual file location

function HomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("move to chat");
    navigate("/chat");
  };

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
          <Button  onClick={(handleClick)} >Chat Now</Button>
        </div>
        <div className="max-w-xs md:max-w-none">
          <img src={image} width="500px" alt="hero" />
        </div>
      </div>
      <Cards />
    </SectionWrapper>
  );
}

export default HomePage;
