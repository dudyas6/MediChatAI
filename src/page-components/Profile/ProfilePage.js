import React, { useEffect, useState } from 'react';
import { useAuth } from '@/services/auth.service';
import SectionWrapper from 'src/page-components/Home/SectionWrapper';
import { useRouter } from 'next/router';

const ProfilePage = () => {
  const { currentUser, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!currentUser) {
        router.push('/');
      } else {
        setLoading(false);
      }
    }
  }, [currentUser, authLoading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <SectionWrapper id="profile">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 text-center md:text-left">
        <div className="tracking-wider md:tracking-normal max-w-xs lg:max-w-xl">
          <h1 className="lg:text-7xl text-4xl font-bold">Your Profile</h1>
          <p className="text-lg md:text-base lg:text-xl my-10">
            {/* {currentUser.email} */}
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
