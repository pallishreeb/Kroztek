import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { usePostApi } from "../context/PostProvider";
const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = usePostApi();
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
    dispatch({
      type: "CLEAR_FILTERS",
    });
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative inline-block text-left" onMouseEnter={handleMouseEnter} >
      <span onClick={toggleMenu} className="cursor-pointer ml-2">
      Products
      </span>
      {isOpen && (
        <div className="z-10 origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" onMouseLeave={handleMouseLeave}>
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <Link to="/products/CG" onClick={() => Clearfilters()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              CG
            </Link>
            <Link to="/products/Sovereign" onClick={() => Clearfilters()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              Sovereign Pumps
            </Link>
            <Link to="/products/OLI"  onClick={() => Clearfilters()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              OLI
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
