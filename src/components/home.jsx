import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const PARTICLE_OPTIONS = {
  background: { color: { value: "#0a0a0a" } },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: { enable: true, mode: "push" },
      onHover: { enable: true, mode: "repulse" },
      resize: true,
    },
    modes: {
      push: { quantity: 4 },
      repulse: { distance: 100, duration: 0.4 },
    },
  },
  particles: {
    color: { value: "#00bfff" },
    links: {
      color: "#8a2be2",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: { enable: true, speed: 2, outModes: { default: "bounce" } },
    number: { density: { enable: true, area: 800 }, value: 80 },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 5 } },
  },
  detectRetina: true,
};

function AnimatedGradientText({ children, className = "" }) {
  return (
    <span
      className={`bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 bg-clip-text text-transparent animate-gradient-x ${className}`}
      style={{
        backgroundSize: "200% 200%",
        animation: "gradient-x 5s ease infinite",
      }}
    >
      {children}
    </span>
  );
}

const Home = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-gray-200 overflow-hidden px-4 sm:px-6 md:px-8 py-8"
      aria-label="Home section"
    >
      {/* Particles BG */}
      <Particles
        id="tsparticles"
        init={loadSlim}
        options={PARTICLE_OPTIONS}
        className="absolute inset-0 z-0"
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center w-full max-w-2xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-extrabold font-mont mb-4"
        >
          <AnimatedGradientText>Pranith Konda</AnimatedGradientText>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-2xl font-semibold mb-6 font-mono"
        >
          <AnimatedGradientText>
            Aspiring Software Engineer &amp; AI Enthusiast
          </AnimatedGradientText>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-base md:text-xl text-gray-300 font-light mb-10 leading-relaxed"
        >
          BTech Student in Computer Science Engineering. Passionate about programming, web development, and artificial intelligence. Dedicated to building innovative solutions and exploring cutting-edge technologies.
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <Button label="About Me" onClick={() => navigate('/about')} />
          <Button label="View Projects" onClick={() => navigate('/projects')} />
          <Button label="Contact Me" onClick={() => navigate('/contact')} />
        </div>
      </motion.div>

      {/* Keyframes for gradient - Tailwind does not support custom animated gradients out of box */}
      <style>
        {`
          .font-mont { font-family: 'Montserrat', sans-serif; }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 5s ease infinite;
          }
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </section>
  );
};

function Button({ label, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.06, y: -3 }}
      whileTap={{ scale: 0.97, y: 1 }}
      className="relative rounded-lg bg-gradient-to-tr from-[#232526] to-[#161a1d] px-7 py-3 font-semibold text-white shadow-md border border-gray-700 hover:from-[#232526]/70 hover:to-[#161a1d]/90 transition-all outline-none focus:ring-2 focus:ring-cyan-400"
      onClick={onClick}
      tabIndex={0}
    >
      {label}
    </motion.button>
  );
}

export default Home;
