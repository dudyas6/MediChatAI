import React, { useEffect } from 'react';
import backgroundImage from '../assets/images/Background.webp';
const HomePage = () => {
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
            position: 'relative' // Add this line to make position:relative
        }}>
            <button
                onClick={handleClick}
                className="bg-white text-blue-500 font-bold py-4 px-10 rounded-full shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                style={{ position: "absolute", bottom: "30%", left: "12%", transform: "translate(-50%, -50%)" }}
                
            >
                Log In
            </button>
            <button
                onClick={handleClick}
                className="bg-white text-blue-500 font-bold py-4 px-10 rounded-full shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                style={{ position: "absolute", bottom: "30%", left: "25%", transform: "translate(-50%, -50%)" }}
            >
                Sign Up
            </button>
            <button
                onClick={handleClick}
                className="bg-white text-blue-500 font-bold py-6 px-14 rounded-full shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                style={{ position: "absolute", bottom: "12%", left: "66.7%", transform: "translate(-50%, -50%)" }}
            >
                CHAT NOW hi
            </button>
        </div>
    );
};

const handleClick = () => {
  alert("button clicked");
}
export default HomePage;
