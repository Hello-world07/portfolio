import React from 'react';

const Projects = () => {
  const handleCheckBack = () => {
    alert('Stay tuned for exciting project updates coming soon!');
  };

  const handleSubscribe = () => {
    alert('Thank you for subscribing! You’ll receive updates on my projects soon.');
  };

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-custom-dark flex items-center justify-center py-8 sm:py-12 transition-colors duration-300 animate-gradient-xy-slow">
      <div className="w-full max-w-full sm:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 heading-underline animate-heading">
          <span className="inline-block transform transition-transform duration-300 hover:scale-110">🚀</span> Welcome to the Projects Section
        </h1>
        <div className="mb-6 sm:mb-8 text-sm sm:text-base text-gray-600 dark:text-gray-200 animate-fade-in text-justify">
          <p className="mb-4">
            Thank you for stopping by! I’m currently working on a few <span className="box-highlight">exciting projects</span> that I’m looking forward to sharing with you soon. Over the years, I’ve learned that quality takes time — and I’m committed to delivering work that reflects both experience and innovation.
          </p>
          <p className="mb-4">
            These upcoming additions won’t keep you waiting for long. Stay tuned — <span className="box-highlight">great things</span> are on the way.
          </p>
          <p className="mb-4">
            In the meantime, feel free to explore the rest of my portfolio, and thank you once again for your interest and support.
          </p>
          <p className="font-semibold">
            Warm regards,<br />
            PranithKonda
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleCheckBack}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg glow-effect hover:from-indigo-600 hover:to-pink-600 transition-all duration-300"
          >
            Check Back Soon
          </button>
        </div>
        <div className="mt-8 relative group tooltip">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-2">
            Project Progress: <span className="font-semibold text-gray-700 dark:text-gray-200">60%</span>
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-indigo-500 to-pink-500 h-2.5 rounded-full"
              style={{ width: '60%' }}
            ></div>
          </div>
          <div className="tooltip-text">
            Currently in the development phase, finalizing core features!
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-200 mb-4">
            Want to stay updated? Subscribe for project news!
          </p>
          <div className="flex justify-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSubscribe}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg glow-effect hover:from-indigo-600 hover:to-pink-600 transition-all duration-300"
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