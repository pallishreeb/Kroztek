import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuthApi } from '../context/authState';
import { LogoutOutlined } from '@ant-design/icons'; // Import the logout icon from Ant Design

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, isAuthenticated, logout } = useAuthApi();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // const handleMouseEnter = () => {
  //   setIsOpen(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsOpen(false);
  // };

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false); // Close the dropdown on logout
  };

  return (
    <div 
      className="relative inline-block text-left" 
      ref={dropdownRef}
    >
      <span onClick={toggleMenu} className="cursor-pointer ml-2">
        Hello, {user?.name}
      </span>
      {isOpen && (
        <div 
          className="z-10 origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" 
        >
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              Profile
            </Link>
            <Link to="/myorders" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              My Orders
            </Link>
            <button 
              onClick={handleLogout} 
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <LogoutOutlined className="mr-2" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
