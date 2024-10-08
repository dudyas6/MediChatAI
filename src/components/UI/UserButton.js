import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/controllers/auth.controller';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import User from '@/assets/Logos/User.jpg';

const UserButton = ({ width, height }) => {
  const { currentUser, loading } = useAuth();
  const [currentUserImage, setCurrentUserImage] = useState(User);
  const router = useRouter();

  const handleUserClick = () => {
    if (currentUser) {
      router.push(`/${currentUser.username}`);
    } else {
      router.push('/login');
    }
  };

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(
        currentUser.details.profilePhoto
          ? currentUser.details.profilePhoto
          : User
      );
    } else {
      setCurrentUserImage(User);
    }
  }, [currentUser, loading]);

  return (
    <div className="flex items-center justify-center space-x-10">
      <div className="relative inline-block">
        <Image
          className="w-10 h-10 rounded-full cursor-pointer"
          src={currentUserImage}
          alt="User"
          onClick={handleUserClick}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
};

export default UserButton;
