import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Button({ label, onClick, variant = 'primary', icon }) {
  const styles = {
    primary: 'bg-[#1a73e8] text-white hover:bg-[#1557b0] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] hover:shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)]',
    secondary: 'bg-white text-[#1a73e8] border border-[#dadce0] hover:bg-[#f8f9fa] hover:border-[#d2d3d4] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] hover:shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)]',
    outline: 'bg-transparent text-gray-700 border-2 border-gray-300 hover:border-[#1a73e8] hover:bg-blue-50 hover:text-[#1a73e8]',
  };

  return (
    <motion.button
      whileHover={{ 
        y: -2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      className={`group relative px-8 py-3.5 rounded-lg font-medium transition-all duration-200 overflow-hidden ${styles[variant]}`}
      onClick={onClick}
      tabIndex={0}
    >
      {/* Ripple effect container */}
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
      >
        <motion.span
          className={`absolute rounded-full ${variant === 'primary' ? 'bg-white' : 'bg-[#1a73e8]'}`}
          initial={{ scale: 0, opacity: 0.3 }}
          whileHover={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: '100%', height: '100%' }}
        />
      </motion.span>
      
      {/* Button content */}
      <span className="relative flex items-center justify-center gap-2">
        {icon && <span className="text-lg">{icon}</span>}
        <span className="tracking-wide">{label}</span>
        
        {/* Animated arrow */}
        <motion.span
          className="inline-block"
          initial={{ x: 0 }}
          whileHover={{ x: 3 }}
          transition={{ duration: 0.2 }}
        >
          →
        </motion.span>
      </span>
    </motion.button>
  );
}

function DownloadResumeButton() {
  return (
    <motion.a
      href="/resume.pdf"
      download
      whileHover={{ 
        y: -2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-medium bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] hover:shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)] transition-all duration-200 overflow-hidden"
      tabIndex={0}
      aria-label="Download Resume"
    >
      {/* Shimmer effect */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      
      <span className="relative flex items-center gap-2 tracking-wide">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download Resume
      </span>
    </motion.a>
  );
}

const Home = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-gray-800 px-6 sm:px-8 md:px-12 py-16 overflow-hidden"
      aria-label="Home section"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/5657af743257c466354ddac1b85c3386.mp4" type="video/mp4" />
        </video>
        
        {/* Elegant overlay for readability - reduced opacity for more visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white/70" />
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      {/* Elegant background gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center w-full max-w-5xl"
      >
        {/* Professional badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/95 backdrop-blur-md border-2 border-blue-500/30 rounded-full mb-8 shadow-xl"
        >
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
          <span className="text-sm font-bold text-gray-900 tracking-wide">AVAILABLE FOR OPPORTUNITIES</span>
        </motion.div>

        {/* Main heading with backdrop */}
        <div className="relative inline-block mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute inset-0 bg-white/80 backdrop-blur-xl rounded-3xl -m-8 shadow-2xl"
            style={{ zIndex: -1 }}
          />
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 100 }}
            className="relative text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 tracking-tight leading-tight px-8 py-4"
            style={{ 
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              WebkitTextStroke: '1px rgba(0, 0, 0, 0.1)',
            }}
          >
            Pranith Konda
          </motion.h1>
        </div>

        {/* Subtitle with backdrop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 inline-block"
        >
          <div className="bg-white/85 backdrop-blur-lg rounded-2xl px-8 py-6 shadow-xl border border-gray-200/50">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight"
            >
              Aspiring Software Engineer & AI Enthusiast
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center justify-center gap-3 text-sm text-gray-700 font-semibold"
            >
              <motion.span 
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-1"
              >
                🎓 BTech in Computer Science
              </motion.span>
              <span className="text-gray-400">•</span>
              <motion.span 
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-1"
              >
                📍 Hyderabad, India
              </motion.span>
            </motion.div>
          </div>
        </motion.div>

        {/* Description with backdrop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-12 max-w-3xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl px-10 py-8 shadow-xl border border-gray-200/50">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-lg md:text-xl text-gray-900 font-medium leading-relaxed"
            >
              Passionate about creating innovative solutions through programming, web development, 
              and artificial intelligence. Committed to leveraging cutting-edge technologies to 
              solve real-world problems and drive meaningful impact.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1.0 }}
          >
            <Button label="About Me" onClick={() => navigate('/about')} variant="primary" icon="👤" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1.1 }}
          >
            <Button label="View Projects" onClick={() => navigate('/projects')} variant="secondary" icon="💼" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1.2 }}
          >
            <Button label="Contact Me" onClick={() => navigate('/contact')} variant="secondary" icon="✉️" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1.3 }}
          >
            <DownloadResumeButton />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Custom animations */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
          
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          
          .animate-blob {
            animation: blob 7s infinite;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
        `}
      </style>
    </section>
  );
};

export default Home;