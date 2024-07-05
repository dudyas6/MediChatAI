import React from 'react';
import { useRouter } from 'next/router';
import SectionWrapper from '../SectionWrapper';
import Cards from './Cards';
import Image from 'next/image';
import image from '@/assets/Images/transparent_background.png'; // Adjust the import path as per your actual file location
import Button from 'src/components/UI/Button'; // Adjust the import path as per your actual file location

function HomePage() {
  const router = useRouter();

  const handleClick = () => {
    console.log('move to chat');
    router.push('/chat');
  };

  return (
    <SectionWrapper id="home">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 text-center md:text-left">
        <div className="tracking-wider md:tracking-normal max-w-xs lg:max-w-xl">
          <h1 className="lg:text-7xl text-4xl font-bold">Your Health Is Our Top Priority</h1>
          <p className="text-lg md:text-base lg:text-xl my-10">
            Securely share your comprehensive medical history and symptoms with an AI doctor, for easier communication and care.
          </p>
          <Button onClick={handleClick}>Chat Now</Button>
        </div>
        <div className="max-w-xs md:max-w-none">
          <Image src={image} width={500} height={500} alt="hero" />
        </div>
      </div>
      <Cards />
    </SectionWrapper>
  );
}

export default HomePage;
