import React from 'react';
import { useNavigate } from 'react-router-dom';
import profilePic from '../assets/image1.jpg'; // Adjust path if necessary

const Home = () => {
  const navigate = useNavigate();

  const handleAboutClick = () => navigate('/about');
  const handleProjectsClick = () => navigate('/projects');
  const handleContactClick = () => navigate('/contact');

  return (
    <section className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100 via-gray-50 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Main Card */}
      <div className="w-80 sm:w-96 md:w-[480px] lg:w-[512px] xl:w-[600px] bg-white dark:bg-gray-850 shadow-xl rounded-2xl p-6 sm:p-8 md:p-10 text-center border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between animate-card-entrance relative z-10">
        {/* Profile Image */}
        <img
          src={profilePic}
          alt="Pranith Konda - Software Engineer"
          className="w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 rounded-full object-cover shadow-md ring-2 ring-blue-400 dark:ring-blue-300/70 mx-auto mb-4 hover:scale-105 transition-transform duration-300 animate-fade-in-up"
          loading="lazy"
        />

        {/* Name */}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 animate-fade-in-up delay-100 font-roboto">
          Pranith Konda
        </h1>

        {/* Subtitle with Blue and Red Text */}
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium mb-3 animate-fade-in-up delay-200 font-roboto">
          <span className="text-blue-600 dark:text-blue-400">Aspiring Software Engineer</span> &{' '}
          <span className="text-red-600 dark:text-red-400">AI Enthusiast</span>
        </h2>

        {/* Bio */}
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-4 font-roboto leading-relaxed animate-fade-in-up delay-300">
          BTech Student in Computer Science Engineering. Passionate about programming, web development, and artificial intelligence. Dedicated to building innovative solutions and exploring cutting-edge technologies.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-row justify-center gap-3 md:gap-4 animate-fade-in-up delay-400">
          <button
            onClick={handleAboutClick}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 dark:hover:bg-blue-600 hover:scale-105 transition-all duration-200 text-xs sm:text-sm md:text-base focus-visible:ring-2 focus-visible:ring-blue-400 outline-none font-roboto"
          >
            About Me
          </button>
          <button
            onClick={handleProjectsClick}
            className="px-4 py-2 bg-green-600 dark:bg-green-500 text-white font-medium rounded-md shadow-sm hover:bg-green-700 dark:hover:bg-green-600 hover:scale-105 transition-all duration-200 text-xs sm:text-sm md:text-base focus-visible:ring-2 focus-visible:ring-green-400 outline-none font-roboto"
          >
            View Projects
          </button>
          <button
            onClick={handleContactClick}
            className="px-4 py-2 bg-red-600 dark:bg-red-500 text-white font-medium rounded-md shadow-sm hover:bg-red-700 dark:hover:bg-red-600 hover:scale-105 transition-all duration-200 text-xs sm:text-sm md:text-base focus-visible:ring-2 focus-visible:ring-red-400 outline-none font-roboto"
          >
            Contact Me
          </button>
        </div>
      </div>

      {/* CSS for Responsive Design and Animations */}
      <style jsx>{`
        /* Import Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

        /* Apply Roboto font */
        .font-roboto {
          font-family: 'Roboto', sans-serif;
        }

        /* Card Entrance Animation */
        @keyframes card-entrance {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-card-entrance {
          animation: card-entrance 0.8s ease-out forwards;
        }

        /* Fade In Up Animation */
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }

        /* Subtle Card Shadow */
        .shadow-xl {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06);
        }
        .hover\:shadow-2xl:hover {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        /* Ensure text fits within card */
        p {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Responsive line clamp */
        @media (min-width: 640px) {
          p { -webkit-line-clamp: 5; }
        }
        @media (min-width: 1024px) {
          p { -webkit-line-clamp: 6; }
        }
      `}</style>
    </section>
  );
};

export default Home;