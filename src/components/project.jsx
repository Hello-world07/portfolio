import React from 'react';

const Projects = () => {
  const handleCheckBack = () => {
    alert('Stay tuned for exciting project updates coming soon!');
  };

  const handleSubscribe = () => {
    alert('Thank you for subscribing! You’ll receive updates on my projects soon.');
  };

  return (
    <section id="projects" className="min-h-screen bg-gray-100 dark:bg-custom-dark flex items-center justify-center py-6 sm:py-8 md:py-12 transition-colors duration-300 animate-gradient-xy-slow">
      <div className="w-full max-w-[90%] xs:max-w-[85%] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6 heading-underline animate-heading">
          🚀 Welcome to the Projects Section
        </h1>
        <div className="mb-4 sm:mb-6 md:mb-8 text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-200 animate-fade-in text-justify">
          <p className="mb-3 sm:mb-4">
            Thank you for stopping by! I’m currently working on a few <span className="box-highlight">exciting projects</span> that I’m looking forward to sharing with you soon. Over the years, I’ve learned that quality takes time — and I’m committed to delivering work that reflects both experience and innovation.
          </p>
          <p className="mb-3 sm:mb-4">
            These upcoming additions won’t keep you waiting for long. Stay tuned — <span className="box-highlight">great things</span> are on the way.
          </p>
          <p className="mb-3 sm:mb-4">
            In the meantime, feel free to explore the rest of my portfolio, and thank you once again for your interest and support.
          </p>
          <p className="font-semibold">
            Warm regards,<br />
            PranithKonda
          </p>
        </div>
        <div className="mt-4 sm:mt-6 flex justify-center">
          <button
            onClick={handleCheckBack}
            className="px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg glow-effect hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 text-sm xs:text-base sm:text-lg"
          >
            Check Back Soon
          </button>
        </div>
        <div className="mt-6 sm:mt-8 relative group tooltip">
          <p className="text-xs xs:text-sm sm:text-base text-gray-500 dark:text-gray-400 text-center mb-2">
            Project Progress: <span className="font-semibold text-gray-700 dark:text-gray-200">60%</span>
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 xs:h-2.5 sm:h-3">
            <div
              className="bg-gradient-to-r from-indigo-500 to-pink-500 h-2 xs:h-2.5 sm:h-3 rounded-full"
              style={{ width: '60%' }}
            ></div>
          </div>
          <div className="tooltip-text xs:top-[-50px] sm:top-[-60px]">
            Currently in the development phase, finalizing core features!
          </div>
        </div>
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs xs:text-sm sm:text-base text-gray-600 dark:text-gray-200 mb-3 sm:mb-4">
            Want to stay updated? Subscribe for project news!
          </p>
          <div className="flex flex-col xs:flex-row justify-center gap-2 sm:gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs xs:text-sm sm:text-base w-full xs:w-auto"
            />
            <button
              onClick={handleSubscribe}
              className="px-1.5 xs:px-2 py-1 xs:py-1.5 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg glow-effect hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 text-[0.65rem] xs:text-xs sm:text-sm"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;