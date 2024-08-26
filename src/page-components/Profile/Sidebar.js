import React from 'react';
import { useAuth } from '@/controllers/auth.controller';
import UserButton from '@/components/UI/UserButton';
import icons from '@/components/Shared/Icons';
import SidebarListItem from './SidebarListItem';

const Sidebar = ({ setSelectedComponent }) => {
  const { currentUser, logout } = useAuth();
  return (
    <nav className="dark:bg-gray-500 bg-white custom-shadow min-h-[900px] top-0 left-0 min-w-[250px] py-6 px-4 font-[sans-serif] overflow-auto flex">
      <div className="relative flex flex-col w-full min-h-full ">
        <div className="relative flex flex-wrap items-center justify-center mr-8 cursor-pointer ">
          <div className="pt-2">
            <UserButton width={60} height={60} />
          </div>
          <div className="ml-4">
            <p className="dark:text-white text-sm text-[#333] font-semibold">
              Welcome!
            </p>
            <p className="text-sm text-center text-gray-400">
              {currentUser?.username}
            </p>
          </div>
        </div>
        <hr className="my-6" />
        <div className="flex-1">
          <h4 className="mb-4 text-sm text-gray-400 dark:text-white">
          </h4>
          <ul className="flex-1 px-2 space-y-4">
            <SidebarListItem
              name="Personal Details"
              icon={icons.personal}
              onClick={() => setSelectedComponent('Personal')}
            />
            <SidebarListItem
              name="Medical Details"
              icon={icons.medical}
              onClick={() => setSelectedComponent('Medical')}
            />
          </ul>
        </div>
        <div className="mt-4 ">
          <ul className="px-2 space-y-4 ">
            <hr className="my-6" />
            <SidebarListItem
              name="Logout"
              icon={icons.logout}
              onClick={() => logout()}
            />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
