// src/components/home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import profilePic from '../assets/image1.jpg'; // Adjust path if necessary

const Home = () => {
  const navigate = useNavigate();

  const handleAboutClick = () => {
    navigate('/about');
  };

  const handleProjectsClick = () => {
    navigate('/projects');
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center py-8 sm:py-12 md:py-16 transition-colors duration-300 relative overflow-hidden font-sans">
      {/* Particles background simulation using CSS animations */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="particle animate-particle-1"></div>
        <div className="particle animate-particle-2"></div>
        <div className="particle animate-particle-3"></div>
        <div className="particle animate-particle-4"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Hero Profile Image */}
        <img
          src={profilePic}
          alt="Profile"
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover shadow-[0_0_12px_rgba(59,130,246,0.4),0_0_24px_rgba(59,130,246,0.2)] mx-auto mb-4 sm:mb-6 md:mb-8 hover:scale-[1.06] transition-transform duration-300 ease-out will-change-transform focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none"
          loading="lazy"
        />
        
        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-2 sm:mb-4 md:mb-6 font-poppins leading-tight relative inline-block animate-fade-in-up">
          Konda Pranith
          <div className="animated-line"></div>
        </h1>
        
        {/* Subtitle */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 md:mb-8 font-poppins animate-fade-in-up delay-200">
          Aspiring Software Engineer & AI Enthusiast
        </h2>
        
        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 font-montserrat leading-relaxed animate-fade-in-up delay-400">
          BTech Student in Computer Science Engineering | Passionate about Programming, Web Development, and Artificial Intelligence. Explore my journey, projects, and skills!
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up delay-600">
          <button
            onClick={handleAboutClick}
            className="px-4 sm:px-6 py-2 sm:py-3 md:px-8 md:py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg glow-effect hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 text-sm sm:text-base md:text-lg font-poppins relative overflow-hidden group"
          >
            <span className="relative z-10">About Me</span>
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </button>
          <button
            onClick={handleProjectsClick}
            className="px-4 sm:px-6 py-2 sm:py-3 md:px-8 md:py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg glow-effect hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 text-sm sm:text-base md:text-lg font-poppins relative overflow-hidden group"
          >
            <span className="relative z-10">View Projects</span>
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </button>
          <button
            onClick={handleContactClick}
            className="px-4 sm:px-6 py-2 sm:py-3 md:px-8 md:py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg glow-effect hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 text-sm sm:text-base md:text-lg font-poppins relative overflow-hidden group"
          >
            <span className="relative z-10">Contact Me</span>
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </button>
        </div>
      </div>

      {/* CSS for animations and particles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }

        /* Particle animation styles */
        @keyframes moveParticles {
          0% { transform: translate(0, 0); opacity: 0.5; }
          25% { transform: translate(25vw, 15vh); opacity: 0.8; }
          50% { transform: translate(50vw, 30vh); opacity: 0.6; }
          75% { transform: translate(75vw, 15vh); opacity: 0.7; }
          100% { transform: translate(100vw, 0); opacity: 0.5; }
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          filter: blur(8px);
          opacity: 0;
        }

        .animate-particle-1 {
          width: 20px; height: 20px;
          background: #4B5EAA;
          top: 10%; left: 5%;
          animation: moveParticles 20s ease-in-out infinite alternate;
        }

        .animate-particle-2 {
          width: 30px; height: 30px;
          background: #8A4AF3;
          top: 40%; left: 80%;
          animation: moveParticles 25s ease-in-out infinite alternate-reverse;
        }

        .animate-particle-3 {
          width: 25px; height: 25px;
          background: #F3A4B4;
          top: 70%; left: 20%;
          animation: moveParticles 18s ease-in-out infinite alternate;
        }

        .animate-particle-4 {
          width: 35px; height: 35px;
          background: #4B5EAA;
          top: 90%; left: 40%;
          animation: moveParticles 22s ease-in-out infinite alternate-reverse;
        }

        /* Animated line styles */
        .animated-line {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 4px;
          background: linear-gradient(90deg, #4B5EAA, #8A4AF3);
          border-radius: 2px;
          animation: drawLine 1.5s ease-out forwards;
        }

        @keyframes drawLine {
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default Home;