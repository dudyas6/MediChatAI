import React, { useState, useEffect } from 'react';
import backgroundImage from 'Assets/Images/Background.webp';
import mobileBackgroundImage from 'Assets/Images/MobileBackground.png';
import Button from 'Components/UI/Button';
import { useAuth } from 'Components/Services/AuthContext';

function HomePage() {
    const [background, setBackground] = useState(window.innerWidth <= 640 ? mobileBackgroundImage : backgroundImage);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
    const { currentUser, logout } = useAuth();
  
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
           { currentUser ? 
            <Button InnerText="Logout" to="/" onClick={logout} bottom="30%" left="12%" py = "60px" px = "170px"/> 
            :
            <>
              <Button InnerText="Log In" to="/login" bottom="22%" left="35%" py = "40px" px = "145px"/>
              <Button InnerText="Sign Up" to="/register" bottom="22%" left="71%" py = "40px" px = "145px"/>
            </>
            }
          <Button InnerText="Chat Now" to="/chat" bottom="12%" left="53%" py = "50px" px = "145px" />
          </>
        ) : (
          <>
          { currentUser ? 
            <Button InnerText="Logout" to="/" onClick={logout} bottom="30%" left="12%" py = "60px" px = "170px"/> :
            <>
              <Button InnerText="Log In" to="/login" bottom="30%" left="12%" py = "60px" px = "150px" />
              <Button InnerText="Sign Up" to="/register" bottom="30%" left="25%" py = "60px" px = "150px" />
            </>
            }
          <Button InnerText="Chat Now" to="/chat" bottom="12%" left="66.7%" py = "60px" px = "170px"/></>
        )}
      </div>
    );
  }

export default HomePage;
