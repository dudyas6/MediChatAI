import React, { useEffect, useState } from 'react';
import { useAuth } from '@/controllers/auth.controller';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import Personal from './Cards/PersonalCard/Personal';
import Medical from './Cards/MedicalCard/Medical';
import Loading from '@/components/UI/Loading';
import MobileSidebar from "./MobileSidebar";
import SectionWrapper from '../Home/SectionWrapper';

const ProfilePage = () => {
  const { currentUser, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  const route = router.query;

  const [selectedComponent, setSelectedComponent] = useState('Personal');
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this breakpoint as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Personal':
        return <Personal id="general" />;
      case 'Medical':
        return <Medical id="medical" />;
      default:
        return null;
    }
  };

  if (authLoading || !currentUser) {
    return <Loading />;
  }

  return (
    <SectionWrapper>
    <div className="pb-3 pr-2" id="profile">
      <div className="min-h-[calc(100vh-220px)] relative flex flex-col md:flex-row gap-3">
        {isMobile ? (
          <MobileSidebar setSelectedComponent={setSelectedComponent} />
        ) : (
          <Sidebar className="flex-shrink-0" setSelectedComponent={setSelectedComponent} />
        )}

        <div className="flex-grow flex flex-col dark:bg-gray-500 bg-white custom-shadow w-full min-w-[250px] py-6 px-4 font-[sans-serif] overflow-auto">
          {renderComponent()}
        </div>
      </div>
    </div>
    </SectionWrapper>
  );
};

export default ProfilePage;
