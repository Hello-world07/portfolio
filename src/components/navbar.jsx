import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaSun, FaMoon, FaFileDownload } from 'react-icons/fa';
import { ThemeContext } from '../ThemeContext';

// Responsive navbar with a working theme toggle and animated Download Resume button
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, changeTheme } = useContext(ThemeContext);

  // Handle scroll effect for navbar shadow and blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleThemeChange = () => {
    console.log('Theme toggle clicked, new theme:', theme === 'dark' ? 'light' : 'dark'); // Debug log
    changeTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 bg-gray-200 dark:bg-custom-dark ${
        isScrolled ? 'backdrop-blur-lg shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Name/Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors duration-300"
            >
              𝓟𝓻𝓪𝓷𝓲𝓽𝓱_𝓚𝓸𝓷𝓭𝓪
            </Link>
          </div>

          {/* Right: Nav Links, Theme Toggle, and Download Resume (Desktop) */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/about"
              className="relative text-sm font-medium text-gray-600 dark:text-gray-200 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors duration-300 group"
            >
              About
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-700 dark:bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </Link>
            <Link
              to="/projects"
              className="relative text-sm font-medium text-gray-600 dark:text-gray-200 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors duration-300 group"
            >
              Projects
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-700 dark:bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </Link>
            <Link
              to="/skills"
              className="relative text-sm font-medium text-gray-600 dark:text-gray-200 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors duration-300 group"
            >
              Skills
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-700 dark:bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </Link>
            <Link
              to="/code"
              className="relative text-sm font-medium text-gray-600 dark:text-gray-200 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors duration-300 group"
            >
              Code
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-700 dark:bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </Link>
            <Link
              to="/contact"
              className="relative text-sm font-medium text-indigo-700 dark:text-indigo-400 px-3 py-1.5 rounded-full transition-all duration-300 group overflow-hidden"
            >
              <span className="absolute inset-0 bg-indigo-100 dark:bg-indigo-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full"></span>
              <span className="relative z-10">Contact Me</span>
            </Link>
            <a
              href="/pranith.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="relative text-sm font-medium text-indigo-700 dark:text-indigo-400 px-3 py-1.5 rounded-full transition-all duration-300 group overflow-hidden hover:scale-105 active:animate-pulse glow-effect"
            >
              <span className="absolute inset-0 bg-indigo-100 dark:bg-indigo-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full"></span>
              <span className="relative z-10 flex items-center space-x-1">
                <span>Resume</span>
                <FaFileDownload className="group-hover:animate-icon-bounce text-base" />
              </span>
            </a>
            {/* Theme Toggle Button (Desktop) */}
            <button
              onClick={handleThemeChange}
              className="text-gray-600 dark:text-gray-200 hover:text-indigo-700 dark:hover:text-indigo-400 focus:outline-none transition-colors duration-300 p-1 rounded"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 dark:text-gray-200 hover:text-indigo-700 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-700 dark:focus:ring-indigo-400 rounded p-1 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-200 dark:bg-custom-dark backdrop-blur-lg overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
        }`}
      >
        <div className="flex flex-col space-y-4 px-4 py-6">
          <Link
            to="/about"
            className="relative text-sm font-medium text-gray-600 dark:text-gray-200 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors duration-300 group"
            onClick={toggleMenu}
          >
            About
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-700 dark:bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
          </Link>
          <Link
            to="/projects"
            className="relative text-sm font-medium text-gray-600 dark:text-gray-200 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors duration-300 group"
            onClick={toggleMenu}
          >
            Projects
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-700 dark:bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
          </Link>
          <Link
            to="/skills"
            className="relative text-sm font-medium text-gray-600 dark:text-gray-200 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors duration-300 group"
            onClick={toggleMenu}
          >
            Skills
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-700 dark:bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
          </Link>
          <Link
            to="/code"
            className="relative text-sm font-medium text-gray-600 dark:text-gray-200 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors duration-300 group"
            onClick={toggleMenu}
          >
            Code
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-700 dark:bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
          </Link>
          <Link
            to="/contact"
            className="relative text-sm font-medium text-indigo-700 dark:text-indigo-400 px-3 py-1.5 rounded-full transition-all duration-300 group overflow-hidden text-center"
            onClick={toggleMenu}
          >
            <span className="absolute inset-0 bg-indigo-100 dark:bg-indigo-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full"></span>
            <span className="relative z-10">Contact Me</span>
          </Link>
          <a
            href="/pranith.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="relative text-sm font-medium text-indigo-700 dark:text-indigo-400 px-3 py-1.5 rounded-full transition-all duration-300 group overflow-hidden text-center hover:scale-105 active:animate-pulse glow-effect"
            onClick={toggleMenu}
          >
            <span className="absolute inset-0 bg-indigo-100 dark:bg-indigo-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full"></span>
            <span className="relative z-10 flex items-center justify-center space-x-1">
              <span>Resume</span>
              <FaFileDownload className="group-hover:animate-icon-bounce text-base" />
            </span>
          </a>
          {/* Theme Toggle in Mobile Menu */}
          <button
            onClick={() => {
              handleThemeChange();
              toggleMenu();
            }}
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-custom-dark rounded transition-colors duration-200"
          >
            {theme === 'dark' ? (
              <>
                <FaSun className="mr-2" /> Light
              </>
            ) : (
              <>
                <FaMoon className="mr-2" /> Dark
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;