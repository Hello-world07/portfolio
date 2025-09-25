import React from 'react';
import { useNavigate } from 'react-router-dom';
import profilePic from '../assets/image1.jpg'; // Adjust path if necessary

const Home = () => {
  const navigate = useNavigate();

  const handleAboutClick = () => navigate('/about');
  const handleProjectsClick = () => navigate('/projects');
  const handleContactClick = () => navigate('/contact');

  return (
    <section className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-16 transition-colors duration-300 relative overflow-hidden font-sans bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-gray-200">
      {/* Immersive Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Layer 1: Deep Space Blobs - Slowest, largest, most diffused */}
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-purple-800 to-indigo-800 rounded-full opacity-5 blur-3xl animate-blob-float top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-pink-800 to-red-800 rounded-full opacity-5 blur-3xl animate-blob-float bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 delay-100"></div>
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-br from-blue-800 to-teal-800 rounded-full opacity-5 blur-3xl animate-blob-float top-1/2 right-1/3 transform -translate-y-1/2 delay-200"></div>

        {/* Layer 2: Abstract Circuit/Grid Pattern - Subtle movement, low opacity */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03] animate-grid-shift" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <pattern id="smallGrid" width="2" height="2" patternUnits="userSpaceOnUse">
            <path d="M 2 0 L 0 0 L 0 2" fill="none" stroke="currentColor" strokeWidth="0.1" />
          </pattern>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="url(#smallGrid)" />
            <path d="M 10 0 L 0 0 L 0 10" fill="none" stroke="currentColor" strokeWidth="0.2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-gray-700 dark:text-gray-200" />
        </svg>

        {/* Layer 3: Dynamic Neural Network / Data Flow Lines (SVG) - Active, flowing */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.08] animate-neural-pan" viewBox="0 0 100 100" preserveAspectRatio="none">
          <g strokeWidth="0.3" fill="currentColor">
            {[...Array(5)].map((_, chainIdx) => (
              <g key={`chain-${chainIdx}`} className={`animate-neural-chain delay-${chainIdx * 100}`}>
                {[...Array(6)].map((_, nodeIdx) => {
                  const x = (10 + nodeIdx * 15 + Math.sin(chainIdx + nodeIdx) * 5 + chainIdx * 2) % 100;
                  const y = (10 + nodeIdx * 12 + Math.cos(chainIdx + nodeIdx) * 5 + chainIdx * 3) % 100;
                  const nextX = (10 + (nodeIdx + 1) * 15 + Math.sin(chainIdx + nodeIdx + 1) * 5 + chainIdx * 2) % 100;
                  const nextY = (10 + (nodeIdx + 1) * 12 + Math.cos(chainIdx + nodeIdx + 1) * 5 + chainIdx * 3) % 100;
                  const colorClass = ['text-indigo-400', 'text-pink-400', 'text-blue-400', 'text-teal-400'][chainIdx % 4];

                  return (
                    <React.Fragment key={`${chainIdx}-${nodeIdx}`}>
                      <circle cx={x} cy={y} r="0.7" className={`${colorClass} animate-node-pulse`} style={{ animationDelay: `${(nodeIdx * 0.2) + (chainIdx * 0.5)}s` }} />
                      {nodeIdx < 5 && (
                        <line x1={x} y1={y} x2={nextX} y2={nextY} className={`${colorClass} animate-line-flow`} style={{ animationDelay: `${(nodeIdx * 0.2 + 0.1) + (chainIdx * 0.5)}s` }} />
                      )}
                    </React.Fragment>
                  );
                })}
              </g>
            ))}
          </g>
        </svg>

        {/* Layer 4: Floating Abstract Tech Symbols (Geometric, rotating) */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(8)].map((_, i) => (
            <svg
              key={`tech-symbol-${i}`}
              className={`absolute w-16 h-16 opacity-[0.05] animate-symbol-rotate ${['text-purple-400', 'text-cyan-400', 'text-lime-400'][i % 3]}`}
              style={{
                top: `${(i * 13 + 5) % 100}%`,
                left: `${(i * 21 + 10) % 100}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${10 + i * 2}s`,
                transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
              }}
              viewBox="0 0 24 24"
            >
              <path d="M4 8h4V4h4v4h4V4h4v4h-4v4h4v4h-4v4h-4v-4h-4v4H4v-4h4v-4H4V8zm4 0v4h4V8H8z" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          ))}
        </div>

        {/* Layer 5: Enhanced Particles / Stardust - More density, subtle trails */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-70 animate-stardust-float"
              style={{
                width: `${0.1 + Math.random() * 0.6}rem`,
                height: `${0.1 + Math.random() * 0.6}rem`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${6 + Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Main Content Card - Stays prominent and interactive */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 bg-gray-800 dark:bg-gray-900 bg-opacity-70 backdrop-filter backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-10 shadow-3xl border border-gray-700/50 dark:border-gray-600/50 hover:shadow-primary-lg transition-shadow duration-300">
        {/* Hero Profile Image */}
        <img
          src={profilePic}
          alt="Konda Pranith - Software Engineer"
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full object-cover shadow-2xl ring-4 ring-indigo-500/60 dark:ring-indigo-400/60 mx-auto mb-8 sm:mb-10 md:mb-12 hover:scale-[1.03] transition-transform duration-300 ease-out will-change-transform focus-visible:ring-offset-4 focus-visible:ring-offset-gray-800 dark:focus-visible:ring-offset-gray-900 outline-none"
          loading="lazy"
        />

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-lg mb-4 sm:mb-6 md:mb-8 font-poppins leading-tight relative inline-block animate-fade-in-up">
          PRANITH KONDA
          <div className="animated-underline"></div>
        </h1>

        {/* Subtitle */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-indigo-400 dark:text-indigo-300 mb-6 sm:mb-8 md:mb-10 font-montserrat animate-fade-in-up delay-200">
          Aspiring Software Engineer & AI Enthusiast
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-sm sm:max-w-md md:max-w-xl lg:max-w-4xl mx-auto mb-10 sm:mb-12 md:mb-14 font-montserrat leading-relaxed animate-fade-in-up delay-400">
          BTech Student in Computer Science Engineering. Passionate about programming, web development, and artificial intelligence. Explore my journey, impactful projects, and evolving skills.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 animate-fade-in-up delay-600">
          <button
            onClick={handleAboutClick}
            className="px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 hover:rotate-2 transform transition-all duration-300 text-sm sm:text-base md:text-lg font-poppins relative overflow-hidden group focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 outline-none animate-subtle-pulse"
          >
            <span className="relative z-10">About Me</span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </button>
          <button
            onClick={handleProjectsClick}
            className="px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-600 to-red-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 hover:rotate-2 transform transition-all duration-300 text-sm sm:text-base md:text-lg font-poppins relative overflow-hidden group focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 outline-none animate-subtle-pulse"
          >
            <span className="relative z-10">View Projects</span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </button>
          <button
            onClick={handleContactClick}
            className="px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 hover:rotate-2 transform transition-all duration-300 text-sm sm:text-base md:text-lg font-poppins relative overflow-hidden group focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 outline-none animate-subtle-pulse"
          >
            <span className="relative z-10">Contact Me</span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </button>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        /* --- General Fade-In for Main Content --- */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }

        /* --- Layer 1: Deep Space Blobs --- */
        @keyframes blob-float {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.05; }
          25% { transform: translate(-45%, -55%) scale(1.03); opacity: 0.06; }
          50% { transform: translate(-50%, -50%) scale(1.06); opacity: 0.05; }
          75% { transform: translate(-55%, -45%) scale(1.03); opacity: 0.06; }
        }
        .animate-blob-float {
          animation: blob-float 16s cubic-bezier(0.4, 0, 0.6, 1) infinite alternate;
        }

        /* --- Layer 2: Abstract Grid Pattern --- */
        @keyframes grid-shift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-20px, -20px); }
        }
        .animate-grid-shift {
          animation: grid-shift 120s linear infinite alternate;
        }

        /* --- Layer 3: Dynamic Neural Network / Data Flow Lines --- */
        @keyframes neural-pan {
          0% { transform: translate(0, 0); }
          100% { transform: translate(5%, 5%); }
        }
        .animate-neural-pan {
          animation: neural-pan 80s linear infinite alternate;
        }

        @keyframes node-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.8); opacity: 1; }
        }
        .animate-node-pulse {
          animation: node-pulse 2.5s ease-in-out infinite alternate;
        }

        @keyframes line-flow {
          0% { stroke-dasharray: 0 100; opacity: 0; }
          30% { opacity: 1; }
          100% { stroke-dasharray: 100 0; opacity: 0.5; }
        }
        .animate-line-flow {
          animation: line-flow 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite forwards;
          stroke-dasharray: 100 0;
        }

        /* --- Layer 4: Floating Abstract Tech Symbols --- */
        @keyframes symbol-rotate {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-symbol-rotate {
          animation: symbol-rotate var(--animation-duration, 15s) linear infinite;
        }

        /* --- Layer 5: Enhanced Particles / Stardust --- */
        @keyframes stardust-float {
          0%, 100% { opacity: 0.7; transform: translate(0, 0) scale(1); }
          25% { opacity: 0.9; transform: translate(20px, -15px) scale(1.1); }
          50% { opacity: 0.8; transform: translate(-10px, 20px) scale(1); }
          75% { opacity: 0.95; transform: translate(15px, 10px) scale(1.15); }
        }
        .animate-stardust-float {
          animation: stardust-float var(--animation-duration, 8s) ease-in-out infinite alternate;
          box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
        }

        /* --- Main Content Card Enhancements --- */
        .drop-shadow-lg {
          text-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
        }
        .shadow-3xl {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 15px rgba(59,130,246,0.3);
        }
        .hover\:shadow-primary-lg:hover {
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 25px rgba(59,130,246,0.5);
        }

        /* --- Animated Underline --- */
        .animated-underline {
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #6366F1, #EC4899);
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          animation: drawUnderline 1.2s ease-out forwards 0.8s;
        }
        @keyframes drawUnderline {
          to { transform: scaleX(1); }
        }

        /* --- Dynamic Button Animations --- */
        @keyframes subtle-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-subtle-pulse {
          animation: subtle-pulse 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Home;