import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t-2 border-gradient-to-r from-indigo-500 to-purple-600 py-1 sm:py-2 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-1 sm:mb-0">
          <p className="text-[8px] sm:text-[10px] text-gray-600 dark:text-gray-300 font-montserrat">
            © {new Date().getFullYear()} Pranith Konda. All rights reserved.
          </p>
        </div>
        <div className="flex gap-1 sm:gap-2">
          <a
            href="https://linkedin.com/in/pranithkonda"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
            aria-label="Visit my LinkedIn profile"
          >
            <FaLinkedin size={10} className="sm:size-12" />
          </a>
          <a
            href="https://github.com/pranithkonda"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
            aria-label="Visit my GitHub profile"
          >
            <FaGithub size={10} className="sm:size-12" />
          </a>
          <a
            href="https://twitter.com/pranithkonda"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
            aria-label="Visit my Twitter profile"
          >
            <FaTwitter size={10} className="sm:size-12" />
          </a>
          <a
            href="mailto:pranith@example.com"
            className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
            aria-label="Send me an email"
          >
            <FaEnvelope size={10} className="sm:size-12" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;