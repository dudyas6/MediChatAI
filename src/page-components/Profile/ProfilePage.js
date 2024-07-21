import React, { useEffect, useState } from 'react';
import { useAuth } from '@/controllers/auth.controller';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import Overview from './Cards/Overview';
import Personal from './Cards/PersonalCard/Personal';
import Medical from './Cards/MedicalCard/Medical';

const ProfilePage = () => {
  const { currentUser, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  const route = router.query;

  const [selectedComponent, setSelectedComponent] = useState('Overview');

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

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Overview':
        return <Overview id="overview"/>;
      case 'Personal':
        return <Personal id="general"/>;
      case 'Medical':
        return <Medical id="medical"/>;
      default:
        return null;
    }
  };

  return (
    <div className="pt-18 pb-3 md:pt-24 pr-2" id="profile">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        <Sidebar setSelectedComponent={setSelectedComponent} />
        <div className="bg-white custom-shadow relative min-h-[900px] max-h-[900px] w-screen min-w-[250px] py-6 px-4 font-[sans-serif] overflow-auto">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
