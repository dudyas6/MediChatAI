import React from 'react';
import User from 'Assets/Logos/user.jpg'
import { useAuth } from 'Components/Services/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserButton = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const handleUserClick = () => {
        currentUser ? navigate('/profile') : navigate('/login');
    }

    return (
    <div className="space-x-10 flex items-center justify-center">
        <div className="relative inline-block">
        <img className="cursor-pointer w-10 h-10 rounded-full" src={User}  alt='User' onClick={handleUserClick}/>
        {currentUser && <span class="h-3 w-3 rounded-full border border-white bg-green-500 block absolute bottom-0 right-0"></span>}
        </div>
    </div>
    );
};

export default UserButton;