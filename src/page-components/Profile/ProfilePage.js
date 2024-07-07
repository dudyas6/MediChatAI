import React, { useEffect, useState } from 'react';
import { useAuth } from '@/services/auth.service';
import SectionWrapper from 'src/page-components/Home/SectionWrapper';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import TempCard from './TempCard';

const ProfilePage = () => {
  const { currentUser, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  const route = router.query;

  useEffect(() => {
    if (!authLoading) {
      if (!currentUser) {
        router.push('/');
      } else {
        if (route.username !== currentUser.username) {
          router.push('/404');
        }
      }
    }
  }, [currentUser, authLoading, router]);

  return (
    <div  className="pt-18 pb-3 md:pt-24 pr-2" id="profile">
            <div className="flex flex-row items-center justify-between gap-3 text-center md:text-left">
        <Sidebar />
        <div className="bg-white custom-shadow relative h-screen w-screen min-w-[250px] py-6 px-4 font-[sans-serif] ">
          <TempCard/>
        </div>
      </div>
    </div>

  );
};


// <div className="tracking-wider md:tracking-normal max-w-xs lg:max-w-xl">
// <h1 className="lg:text-7xl text-4xl font-bold">Your Profile</h1>
// <p className="text-lg md:text-base lg:text-xl my-10">
// </p>
// <button onClick={logout}>Log Out</button>
// </div>
// <div className="max-w-xs md:max-w-none">
// <img src={""} alt="hero" />
// </div>
export default ProfilePage;
