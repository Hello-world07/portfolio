import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

// A fully responsive, modern Certifications section with dynamic background, particles, glow effects, and advanced animations
const Certifications = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage] = useState('/1oracle.jpg'); // Constant certificate image

  // Check if device is mobile (below 768px)
  const isMobile = window.innerWidth < 768;

  const openModal = () => {
    if (!isMobile) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Particle initialization
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Particle options for subtle, modern effect
  const particlesOptions = {
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push',
        },
        onHover: {
          enable: true,
          mode: 'repulse',
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: ['#4B5EAA', '#8A4AF3', '#F3A4B4'],
      },
      links: {
        enable: false,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'out',
        },
        random: true,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 50,
      },
      opacity: {
        value: 0.5,
        random: true,
      },
      shape: {
        type: ['circle', 'triangle', 'square'],
      },
      size: {
        value: { min: 1, max: 5 },
        random: true,
      },
    },
    detectRetina: true,
  };

  // Certification data with constant image
  const certifications = [
    {
      title: 'Oracle Cloud Infrastructure 2025 Certified Data Science Professional',
      image: selectedImage,
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 flex items-center justify-center py-12 sm:py-16 transition-colors duration-300 relative overflow-hidden">
      {/* Static Background Shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-200 dark:bg-purple-800 rounded-lg opacity-20 transform rotate-45"></div>
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-pink-200 dark:bg-pink-800 opacity-20 transform rotate-60"></div>
        <div className="absolute bottom-1/4 right-1/3 w-36 h-36 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20"></div>
        <div className="absolute top-20 right-10 w-40 h-40 bg-green-200 dark:bg-green-800 opacity-15 transform rotate-30"></div>
        <div className="absolute bottom-10 left-20 w-28 h-28 bg-yellow-200 dark:bg-yellow-800 rounded-lg opacity-15"></div>
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-red-200 dark:bg-red-800 opacity-20 transform rotate-90"></div>
        <div className="absolute top-1/4 right-1/4 w-16 h-16 border-4 border-blue-300 dark:border-blue-600 rounded-full opacity-25"></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 border-l-4 border-r-4 border-purple-300 dark:border-purple-600 opacity-20"></div>
        <div className="absolute top-5 right-1/2 w-20 h-20 bg-teal-200 dark:bg-teal-800 opacity-15 transform rotate-15"></div>
        <div className="absolute bottom-5 left-1/2 w-30 h-30 bg-orange-200 dark:bg-orange-800 rounded-full opacity-20"></div>
      </div>

      {/* Particles */}
      <Particles
        id="tsparticles"
        className="absolute inset-0 z-0"
        init={particlesInit}
        options={particlesOptions}
      />

      <div className="w-full max-w-full sm:max-w-3xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-20">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 lg:mb-10 text-center relative"
          >
            My Certifications
            <motion.div
              className="absolute bottom-0 left-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ width: 0, x: '-50%' }}
              animate={{ width: '8rem', x: '-50%' }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
            />
          </motion.h1>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 relative">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                whileHover={{ scale: !isMobile ? 1.05 : 1, boxShadow: !isMobile ? '0px 15px 25px rgba(0, 0, 0, 0.15)' : 'none' }}
                className="bg-white dark:bg-gray-800 p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 glow-effect w-full max-w-md mx-auto relative overflow-hidden"
                onClick={openModal}
                role="button"
                aria-label={`View ${cert.title} certificate`}
                tabIndex={0}
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.2, delay: index * 0.2 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.2, delay: index * 0.2 + 0.3 }}
                />
                <motion.div
                  className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ duration: 1.2, delay: index * 0.2 + 0.1 }}
                />
                <motion.div
                  className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500"
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ duration: 1.2, delay: index * 0.2 + 0.4 }}
                />
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  className="w-full h-48 sm:h-56 lg:h-64 object-contain rounded-lg mb-4 sm:mb-6 transition-transform duration-300 hover:scale-105"
                />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 text-center">
                  {cert.title}
                </h3>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 sm:mt-10 text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 text-center italic"
          >
            These are my professional certifications. More will be added as I achieve them.
          </motion.p>
        </div>
      </div>

      {/* Modal for Image Preview (Tablets and Desktops only) */}
      <AnimatePresence>
        {isModalOpen && !isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl p-6 m-4 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Zoomable Image Feature */}
              <TransformWrapper
                initialScale={1}
                maxScale={3}
                minScale={0.5}
                wheel={{ wheelEnabled: true }}
                pinch={{ pinchEnabled: true }}
                doubleClick={{ mode: 'zoomIn' }}
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-center gap-4 mb-4">
                      <button
                        onClick={() => zoomIn()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-base"
                        aria-label="Zoom in"
                      >
                        Zoom In
                      </button>
                      <button
                        onClick={() => zoomOut()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-base"
                        aria-label="Zoom out"
                      >
                        Zoom Out
                      </button>
                      <button
                        onClick={() => resetTransform()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-base"
                        aria-label="Reset zoom"
                      >
                        Reset
                      </button>
                    </div>
                    <TransformComponent wrapperClass="flex-1 flex items-center justify-center">
                      <img
                        src={selectedImage}
                        alt="Certificate preview"
                        className="w-full h-auto max-h-[75vh] object-contain"
                      />
                    </TransformComponent>
                  </div>
                )}
              </TransformWrapper>
              <button
                onClick={closeModal}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg w-full"
                aria-label="Close modal"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for glow effect */}
      <style jsx>{`
        .glow-effect {
          position: relative;
        }
        .glow-effect:hover::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }
      `}</style>
    </section>
  );
};

export default Certifications;