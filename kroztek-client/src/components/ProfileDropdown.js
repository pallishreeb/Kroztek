
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuthApi } from '../context/authState'; 
const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout,cart } = useAuthApi();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  const Clearfilters = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative inline-block text-left" onMouseEnter={handleMouseEnter} >
      <span onClick={toggleMenu} className="cursor-pointer ml-2">
      Hello,{user?.name}
      </span>
      {isOpen && (
        <div className="z-10 origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" onMouseLeave={handleMouseLeave}>
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <Link to="/profile" onClick={() => Clearfilters()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              Profile
            </Link>
            <Link to="/myorders" onClick={() => Clearfilters()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              My Orders
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
