import React from 'react';
import { useTheme } from 'Components/Services/ThemeContext';
import AboutPageImage from 'Assets/Images/AboutPageImage.png';

function AboutPage() {
    const { isDarkMode } = useTheme();

    return (
        <div className={`min-h-screen flex flex-col items-center pt-10 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-50'}`}>
            <main className="w-full max-w-6xl p-6 mb-12 bg-white dark:bg-gray-700 shadow-md rounded-lg">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 p-6">
                        <h1 className={`text-4xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About Us</h1>
                        <p className={`mb-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Welcome to our AI Healthcare Consultant Bot, your free and accessible online assistant for healthcare advice. Our mission is to provide reliable, AI-driven health consultations to help you manage your health and wellness from the comfort of your home.</p>
                        <p className={`mb-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Our AI healthcare consultant bot uses advanced machine learning algorithms to offer personalized health recommendations and guidance. While it is not a substitute for professional medical advice, it serves as a preliminary source of information for various health-related queries.</p>
                        <p className={`mb-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>We are committed to ensuring that our bot is continually updated with the latest medical knowledge and standards to provide you with the best possible service. Your privacy and security are our top priorities, and we adhere to strict data protection regulations to keep your information safe.</p>
                        <p className={`mb-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Thank you for choosing our AI Healthcare Consultant Bot. We hope it helps you lead a healthier and happier life.</p>
                    </div>
                    <div className="md:w-1/2 p-6">
                        <img src={AboutPageImage} alt="AI Healthcare Consultant" className="rounded-lg shadow-md w-full object-cover" />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AboutPage;
