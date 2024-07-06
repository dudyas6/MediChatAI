import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/services/auth.service';
import { useRouter } from 'next/router';
import User from '@/assets//Logos/User.jpg';

const UserButton = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  const handleUserClick = () => {
    if (currentUser) {
      router.push(`/${currentUser.username}`);
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="space-x-10 flex items-center justify-center">
      <div className="relative inline-block">
        <Image
          className="cursor-pointer w-10 h-10 rounded-full"
          src={User}
          alt="User"
          onClick={handleUserClick}
          width={40}
          height={40}
        />
        {currentUser && (
          <span className="h-3 w-3 rounded-full border border-white bg-green-500 block absolute bottom-0 right-0"></span>
        )}
      </div>
    </div>
  );
};

export default UserButton;
