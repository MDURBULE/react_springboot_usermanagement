import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center relative">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
        <span className="font-semibold text-xl">My Website</span>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            ></path>
          </svg>
        </button>
      </div>

      {/* Navigation Links and Add User Button */}
      <nav
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } absolute top-16 left-0 w-full bg-blue-600 md:flex md:static md:w-auto md:space-x-4`}
      >
        <div className="flex flex-col md:flex-row md:space-x-4 w-full">
          <Link to="/" className="block py-2 px-4 hover:text-gray-300">
            Home
          </Link>
          <Link href="#" className="block py-2 px-4 hover:text-gray-300">
            About
          </Link>
          <Link href="#" className="block py-2 px-4 hover:text-gray-300">
            Services
          </Link>
          <Link href="#" className="block py-2 px-4 hover:text-gray-300">
            Contact
          </Link>
        </div>
        <div className="md:hidden flex justify-center mt-4">
          <Link className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-gray-200" to="/addUser">
            Add User
          </Link>
        </div>
      </nav>

      {/* Add User Button for Desktop */}
      <Link className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-gray-200 hidden md:block" to="/addUser">
        Add User
      </Link>
    </header>
  );
};

export default Header;
