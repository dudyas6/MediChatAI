import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
      <nav className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-blue-600 text-2xl font-bold">MediChat</h1>
          <div className="space-x-4">
            <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
            <Link to="/about" className="text-blue-600 hover:text-blue-800">About</Link>
            <Link to="/login" className="text-blue-600 hover:text-blue-800">Contact</Link>
          </div>
        </div>
      </nav>
    );
  };

export default Navbar;