import React, { useState, useEffect } from 'react';
import backgroundImage from '../assets/images/Background.webp';
import mobileBackgroundImage from '../assets/images/MobileBackground.png';
import Button from '../components/HomePage/Button';

function HomePage() {
  const [background, setBackground] = useState(window.innerWidth <= 640 ? mobileBackgroundImage : backgroundImage);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setBackground(mobileBackgroundImage);
        setIsMobile(true);
      } else {
        setBackground(backgroundImage);
        setIsMobile(false);
      }
    };

    // Set initial state based on window size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className="flex-1 flex flex-col justify-center items-center text-center text-white relative"
      style={{
        backgroundImage: `url(${background})`,
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {isMobile ? (
        <>
        <Button InnerText="Log In" to="/login" bottom="22%" left="35%" py = "40px" px = "145px"/>
        <Button InnerText="Sign Up" to="/register" bottom="22%" left="71%" py = "40px" px = "145px"/>
        <Button InnerText="Chat Now" to="/chat" bottom="12%" left="53%" py = "50px" px = "145px" /> </>
      ) : (
        <>
        {/* // py-6 px-14 */}
        <Button InnerText="Log In" to="/login" bottom="30%" left="12%" py = "60px" px = "150px" />
        <Button InnerText="Sign Up" to="/register" bottom="30%" left="25%" py = "60px" px = "150px" />
        <Button InnerText="Chat Now" to="/chat" bottom="12%" left="66.7%" py = "60px" px = "170px"/></>
      )}
    </div>
  );
}

export default HomePage;
