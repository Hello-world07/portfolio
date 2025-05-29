import React from 'react';

// A responsive Projects section with dark mode support
const Projects = () => {
  return (
    <section className="min-h-screen bg-gray-100 dark:bg-custom-dark flex items-center justify-center py-8 sm:py-12 transition-colors duration-300">
      <div className="w-full max-w-full sm:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">My Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white dark:bg-custom-dark-secondary p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Project 1</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-200 mt-2">
              A web application built with React and Tailwind CSS.
            </p>
          </div>
          <div className="bg-white dark:bg-custom-dark-secondary p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Project 2</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-200 mt-2">
              A responsive dashboard using Vite and modern JavaScript.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;