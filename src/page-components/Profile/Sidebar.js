import React from 'react';
import { useAuth } from '@/controllers/auth.controller';
import UserButton from "@/components/UI/UserButton";
import icons from '@/components/Shared/Icons'
import SidebarListItem from './SidebarListItem';

const Sidebar = ({ setSelectedComponent }) => {
  const { currentUser } = useAuth();
  return (
    <nav className="bg-white custom-shadow min-h-[900px] top-0 left-0 min-w-[250px] py-6 px-4 font-[sans-serif] overflow-auto">
      <div className="relative flex flex-col h-full">
        <div className="flex flex-wrap items-center cursor-pointer relative justify-center mr-8">
          <div className='pt-2'>
            <UserButton width={60} height={60} />
          </div>
          <div className="ml-4">
            <p className="text-sm text-[#333] font-semibold">Welcome!</p>
            <p className="text-sm text-gray-400 text-center">{currentUser?.username}</p>
          </div>
        </div>
        <hr className="my-6" />
        <div>
          <h4 className="text-sm text-gray-400 mb-4">Personal</h4>
          <ul className="space-y-4 px-2 flex-1">
            <SidebarListItem name="Overview" icon={icons.dashboard} onClick={() => setSelectedComponent('Overview')} />
            <SidebarListItem name="Personal Details" icon={icons.personal} onClick={() => setSelectedComponent('Personal')} />
            <SidebarListItem name="Medical Details" icon={icons.medical} onClick={() => setSelectedComponent('Medical')} />
          </ul>
        </div>
        <hr className="my-6" />
        <div className="flex-1">
          <h4 className="text-sm text-gray-400 mb-4">Shared</h4>
          <ul className="space-y-4 px-2 flex-1">
            <SidebarListItem name="x" onClick={() => setSelectedComponent('')} />
            <SidebarListItem name="y" />
          </ul>
        </div>
        <hr className="my-6" />
        <div className="mt-4">
          <ul className="space-y-4 px-2">
            <SidebarListItem name="Settings" />
            <SidebarListItem name="Log out" />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
