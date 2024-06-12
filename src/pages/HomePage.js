import React, { useEffect } from 'react';
import backgroundImage from '../assets/images/Background.webp';
import Button from '../components/HomePage/Button';
function HomePage ()  {
    useEffect(() => {
        // Disable scrolling on mount
        document.body.style.overflow = 'hidden';

        // Re-enable scrolling when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div style={{
            backgroundImage: `url(${backgroundImage})`,
            minHeight: '100vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            textAlign: 'center',
            color: 'white',
            position: 'relative' 
        }}>
            <Button InnerText="Log In" to="/login" bottom="30%" left="12%" />
            <Button InnerText="Sign Up" to="/register" bottom="30%" left="25%" />
            <Button InnerText="Chat Now" to="/chat" bottom="12%" left="66.7%" />
        </div>
    );
};


export default HomePage;
