import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FormDropdown = () => {
  const options = ["LT Motors"];
  // const [selectedOption, setSelectedOption] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleButtonClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (option) => {
    setDropdownOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={dropdownOpen ? 'true' : 'false'}
          onClick={handleButtonClick}
        >
          {'Send Requiremnts'}
        </button>
      </div>

      {/* Dropdown */}
      {dropdownOpen && (
        <div className="z-10 origin-top-right absolute mt-2 w-max rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" style={{width:"140px"}}>
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <Link
                key={option}
                to={`/requirement/${option}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                role="menuitem"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormDropdown;
