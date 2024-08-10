import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/controllers/auth.controller';
import SidebarListItem from './SidebarListItem';
import icons from '@/components/Shared/Icons';

export const MobileSidebar = ({ setSelectedComponent }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(prevState => !prevState);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 480);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className='dark:bg-gray-500 shadow-md rounded-sm bg-white font-[sans-serif]'>
            <div className="p-4 font-sans">
                {isMobile ? (
                    <div className='relative' ref={dropdownRef}>
                        <div className='flex justify-center'>
                            <button
                                type="button"
                                id="dropdownToggle"
                                onClick={toggleDropdown}
                                className="px-4 py-2 flex items-center rounded-full text-[#333] text-sm border border-gray-300 outline-none hover:bg-gray-100"
                            >
                                Open Menu
                                {icons.dropdown}
                            </button>
                        </div>

                        {isOpen && (
                            <ul className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 flex flex-col justify-center shadow-lg bg-white py-2 z-[1000] items-center w-max rounded-lg max-h-96 overflow-auto">
                                <li id="overviewTab" className="py-2.5 px-5 flex items-center justify-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
                                    <SidebarListItem name="Overview" icon={icons.dashboard} onClick={() => setSelectedComponent('Overview')} />
                                </li>
                                <li id="personalTab" className="py-2.5 px-5 flex items-center justify-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
                                    <SidebarListItem name="Personal" icon={icons.personal} onClick={() => setSelectedComponent('Personal')} />
                                </li>
                                <li id="medicalTab" className="py-2.5 px-5 flex items-center justify-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
                                    <SidebarListItem name="Medical" icon={icons.medical} onClick={() => setSelectedComponent('Medical')} />
                                </li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <ul className="flex flex-row justify-center gap-2 bg-gray-100">
                        <li id="overviewTab" className="tab text-gray-600 font-semibold text-[15px] py-3.5 px-7 border-t-[3px] border-gray-100 cursor-pointer">
                            <SidebarListItem name="Overview" onClick={() => setSelectedComponent('Overview')} />
                        </li>
                        <li id="personalTab" className="tab text-gray-600 font-semibold text-[15px] py-3.5 px-7 border-t-[3px] border-gray-100 cursor-pointer">
                            <SidebarListItem name="Personal" onClick={() => setSelectedComponent('Personal')} />
                        </li>
                        <li id="medicalTab" className="tab text-gray-600 font-semibold text-[15px] py-3.5 px-7 border-t-[3px] border-gray-100 cursor-pointer">
                            <SidebarListItem name="Medical" onClick={() => setSelectedComponent('Medical')} />
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MobileSidebar;
