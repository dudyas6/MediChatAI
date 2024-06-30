import React, { useEffect } from 'react';
import { useAuth } from 'Components/Services/AuthContext';
import SectionWrapper from 'Components/Main/Home/SectionWrapper';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  // If currentUser is null, render nothing or a loading spinner
  if (!currentUser) {
    return null; // Or render a loading spinner
  }

  return (
    <SectionWrapper id="profile">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 text-center md:text-left">
        <div className="tracking-wider md:tracking-normal max-w-xs lg:max-w-xl">
          <h1 className="lg:text-7xl text-4xl font-bold">Your Profile</h1>
          <p className="text-lg md:text-base lg:text-xl my-10">
            {currentUser.email}
          </p>
          <button onClick={logout}>Log Out</button>
        </div>
        <div className="max-w-xs md:max-w-none">
          <img src={""} alt="hero" />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ProfilePage;
