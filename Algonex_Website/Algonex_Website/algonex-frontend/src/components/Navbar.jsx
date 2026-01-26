import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Courses', path: '/allcourses' },
    { title: 'Career Updates', path: '/career-updates' },
    { title: 'Events', path: '/events' },
    { title: 'About Us', path: '/aboutus' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://ik.imagekit.io/ipo22webapp/Picture1.png?updatedAt=1759509431158"
              alt="Algonex Logo"
              className="h-10 w-auto"
            />
            <span className="ml-2 text-3xl font-extrabold text-[#00B4D8] tracking-tight hidden sm:block" style={{ fontFamily: "'Comfortaa', cursive" }}>
              Algonex
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex items-center space-x-6 text-gray-700 font-medium">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-[#00B4D8] transition-colors duration-200">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/signin">
              <button className="px-6 py-2 rounded-full border-2 border-[#00B4D8] text-[#00B4D8] font-bold cursor-pointer transition-all duration-300 hover:bg-[#00B4D8] hover:text-white">
                Register
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-[#00B4D8] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>

        {/* Menu Content */}
        <div className={`absolute right-0 top-0 h-full w-64 bg-white shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 flex flex-col h-full">
            <button className="self-end p-2 mb-8" onClick={() => setIsOpen(false)}>
              <X size={28} />
            </button>

            <ul className="flex flex-col space-y-6 text-lg font-semibold text-gray-800">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="block hover:text-[#00B4D8] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/signin" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#00B4D8] to-[#0077B6] text-white font-bold shadow-lg">
                    Register
                  </button>
                </Link>
              </li>
            </ul>

            <div className="mt-auto py-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 text-center">© 2025 Algonex IT Solutions</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
