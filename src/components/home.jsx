import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const Home = () => {
  const navigate = useNavigate();
  const particlesInit = async (main) => {
    await loadSlim(main);
  };

  const particlesLoaded = (container) => {
    // console.log(container); // Can be enabled for debugging
  };

  const handleAboutClick = () => navigate('/about');
  const handleProjectsClick = () => navigate('/projects');
  const handleContactClick = () => navigate('/contact');

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gray-950 text-gray-200 overflow-hidden p-4 sm:p-6 md:p-8">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#0a0a0a",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 100, // Smaller distance for tighter repulse on small screens
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#00bfff", // Deep Sky Blue for particles
            },
            links: {
              color: "#8a2be2", // Blue Violet for links
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800, // Adjusted area for density
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center w-full max-w-xl md:max-w-2xl lg:max-w-4xl px-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-3 sm:mb-4 font-sans leading-tight"
        >
          Pranith Konda
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-5 sm:mb-6 font-mono bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 animate-gradient-shift"
        >
          Aspiring Software Engineer & AI Enthusiast
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed font-light font-roboto animate-typewriter-text"
          style={{ width: 'auto', borderRight: 'none', overflow: 'visible', whiteSpace: 'normal' }} // Override typewriter for full text display
        >
          BTech Student in Computer Science Engineering. Passionate about programming, web development, and artificial intelligence. Dedicated to building innovative solutions and exploring cutting-edge technologies.
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-6">
          {/* About Me Button */}
          <motion.button
            className="custom-button"
            onClick={handleAboutClick}
          >
            <span className="button_top">About Me</span>
          </motion.button>

          {/* View Projects Button */}
          <motion.button
            className="custom-button"
            onClick={handleProjectsClick}
          >
            <span className="button_top">View Projects</span>
          </motion.button>

          {/* Contact Me Button */}
          <motion.button
            className="custom-button"
            onClick={handleContactClick}
          >
            <span className="button_top">Contact Me</span>
          </motion.button>
        </div>
      </motion.div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Montserrat:wght@700;800;900&family=Fira+Code:wght@400;500;600;700&display=swap');

        .font-roboto { font-family: 'Roboto', sans-serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .font-mono { font-family: 'Fira Code', monospace; }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 5s ease infinite;
        }

        /* Modified typewriter animation for full display after animation */
        .animate-typewriter-text {
          position: relative;
          display: inline-block; /* Essential for the 'typing' effect to have a width */
          overflow: hidden;
          white-space: nowrap;
          animation: typewriter-reveal 2s steps(60, end) forwards;
          border-right: .15em solid transparent; /* Start with transparent border */
        }

        @keyframes typewriter-reveal {
          0% { width: 0; border-color: rgba(0, 191, 255, 0.8); } /* Deep Sky Blue caret visible */
          99.9% { width: 100%; border-color: rgba(0, 191, 255, 0.8); }
          100% { width: 100%; border-color: transparent; white-space: normal; overflow: visible; } /* Full width, no caret, wrap text */
        }
        
        /* The blink-caret animation is now separate and applied only during typing */
        .animate-typewriter-text::after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: .15em;
          background-color: transparent; 
          animation: blink-caret-visible 0.75s step-end infinite;
          animation-delay: 2s; /* Start blinking after typewriter effect */
          opacity: 0; /* Hidden initially */
        }

        @keyframes blink-caret-visible {
          0% { opacity: 1; background-color: rgba(0, 191, 255, 0.8); } /* Deep Sky Blue caret */
          50% { opacity: 0; background-color: rgba(0, 191, 255, 0.8); }
          100% { opacity: 1; background-color: rgba(0, 191, 255, 0.8); }
        }

        /* Override for full text display */
        .animate-typewriter-text[style*="width: auto"] {
          white-space: normal !important;
          overflow: visible !important;
          border-right: none !important;
          animation: none !important;
        }
        .animate-typewriter-text[style*="width: auto"]::after {
          display: none !important;
        }

        /* Uiverse Button Styles - Adjusted for dark background */
        .custom-button {
          /* Variables */
          --button_radius: 0.75em;
          --button_color: #2e2e2e; /* Darker background for the top part */
          --button_outline_color: #ffffff; /* White outline for contrast */
          font-size: 17px;
          font-weight: bold;
          border: none;
          cursor: pointer;
          border-radius: var(--button_radius);
          background: var(--button_outline_color); /* The 'shadow' part */
          min-width: 150px; /* Ensure buttons have a minimum width */
          height: fit-content; /* Adjust height based on content */
        }

        .custom-button .button_top {
          display: block;
          box-sizing: border-box;
          border: 2px solid var(--button_outline_color);
          border-radius: var(--button_radius);
          padding: 0.75em 1.5em;
          background: var(--button_color);
          color: var(--button_outline_color); /* White text color */
          transform: translateY(-0.2em);
          transition: transform 0.1s ease;
          width: 100%; /* Make the top button fill its parent custom-button */
        }

        .custom-button:hover .button_top {
          /* Pull the button upwards when hovered */
          transform: translateY(-0.33em);
        }

        .custom-button:active .button_top {
          /* Push the button downwards when pressed */
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};

export default Home;