import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────
   Reusable Components
───────────────────────────────────────── */

function PrimaryButton({ label, onClick, icon }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold text-sm tracking-wide overflow-hidden group"
      style={{ background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)', color: '#fff' }}
    >
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(135deg, #0072ff 0%, #00c6ff 100%)' }}
      />
      <span className="relative flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {label}
      </span>
    </motion.button>
  );
}

function GhostButton({ label, onClick, icon }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300"
      style={{
        border: '1px solid rgba(255,255,255,0.2)',
        color: 'rgba(255,255,255,0.85)',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {icon && <span>{icon}</span>}
      {label}
    </motion.button>
  );
}

function DownloadButton() {
  return (
    <motion.a
      href="/resume.pdf"
      download
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300"
      style={{
        border: '1px solid rgba(255,255,255,0.15)',
        color: 'rgba(255,255,255,0.85)',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Download Resume
    </motion.a>
  );
}

function GlowOrb({ color, size, mobileSize, style }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: mobileSize || size,
        height: mobileSize || size,
        background: color,
        filter: 'blur(80px)',
        opacity: 0.15,
        ...style,
      }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ─────────────────────────────────────────
   Main Home Component
───────────────────────────────────────── */
const Home = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Space+Grotesk:wght@500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .home-root {
          font-family: 'DM Sans', sans-serif;
          background: #000;
          color: #fff;
        }

        .home-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity: 0.025;
          pointer-events: none;
          z-index: 0;
        }

        .gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, #a0c4ff 50%, #c4b5fd 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cyan-gradient-text {
          background: linear-gradient(135deg, #00c6ff 0%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #0072ff; border-radius: 2px; }

        /* On portrait/mobile — scale video by width so full car is visible, no cropping */
        @media (max-width: 768px) and (orientation: portrait) {
          .bg-video {
            width: 100% !important;
            height: auto !important;
            min-width: unset !important;
            min-height: unset !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
          }
        }

        /* Landscape mobile / tablet — fill full screen */
        @media (max-width: 768px) and (orientation: landscape) {
          .bg-video {
            width: auto !important;
            height: 100% !important;
            min-width: 100% !important;
          }
        }

        /* Desktop — cover full background */
        @media (min-width: 769px) {
          .bg-video {
            width: auto !important;
            height: 100% !important;
            min-width: 100% !important;
          }
        }

        /* Mobile: stack buttons full width in 2 columns */
        @media (max-width: 480px) {
          .btn-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            width: 100%;
          }
          .btn-grid > *:last-child:nth-child(odd) {
            grid-column: 1 / -1;
          }
        }

        /* Tablet and up: row layout */
        @media (min-width: 481px) {
          .btn-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 12px;
          }
        }
      `}</style>

      <section className="home-root relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4 sm:px-6 md:px-8">

        {/* ── Video Background ── */}
        <div className="absolute inset-0 z-0" style={{ overflow: 'hidden' }}>
          <video
            ref={videoRef}
            className="bg-video"
            autoPlay loop muted playsInline preload="auto"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: 'auto',
              opacity: 0.6,
            }}
          >
            {/* Place hello123.mp4 in your /public folder */}
            <source src="/hello123.mp4" type="video/mp4" />
          </video>
          {/* Bottom fade so content stays readable */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.6) 100%)',
            }}
          />
        </div>

        {/* ── Ambient Glow Orbs ── */}
        <GlowOrb color="#0072ff" size="520px" mobileSize="260px" style={{ top: '-80px', left: '-80px' }} />
        <GlowOrb color="#a78bfa" size="420px" mobileSize="220px" style={{ top: '60px', right: '-60px' }} />
        <GlowOrb color="#00c6ff" size="360px" mobileSize="200px" style={{ bottom: '-60px', left: '30%' }} />

        {/* ── Grid Lines ── */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '72px 72px',
          }}
        />

        {/* ── Main Content ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-4xl mx-auto text-center py-12 sm:py-0"
        >

          {/* Available badge */}
          <motion.div variants={itemVariants} className="mb-6 sm:mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card">
              <span
                className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"
                style={{ boxShadow: '0 0 8px #34d399' }}
              />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariants} className="mb-4 sm:mb-5">
            <h1
              className="gradient-text font-bold leading-none"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2.4rem, 9vw, 7rem)',
                letterSpacing: '-0.03em',
              }}
            >
              Pranith Konda
            </h1>
          </motion.div>

          {/* Role */}
          <motion.div variants={itemVariants} className="mb-4 sm:mb-5">
            <p
              className="cyan-gradient-text font-semibold tracking-wide"
              style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }}
            >
              Aspiring Software Engineer &amp; AI Enthusiast
            </p>
          </motion.div>

          {/* Location + Education */}
          <motion.div
            variants={itemVariants}
            className="mb-6 sm:mb-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-5 text-xs sm:text-sm font-medium"
            style={{ color: 'rgba(255,255,255,0.95)', textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
          >
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Hyderabad, India
            </span>
            <span
              className="hidden sm:inline w-1 h-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.2)' }}
            />
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              BTech — Computer Science
            </span>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="mb-8 sm:mb-10 max-w-xl sm:max-w-2xl mx-auto px-2 sm:px-0">
            <p
              className="leading-relaxed"
              style={{
                color: 'rgba(255,255,255,0.92)',
                fontWeight: 400,
                fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
                textShadow: '0 1px 10px rgba(0,0,0,0.9)',
              }}
            >
              Passionate about creating innovative solutions through programming, web development,
              and artificial intelligence. Committed to leveraging cutting-edge technologies to
              solve real-world problems and drive meaningful impact.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants}>
            <div className="btn-grid">
              <PrimaryButton label="About Me" onClick={() => navigate('/about')} icon="👤" />
              <GhostButton label="View Projects" onClick={() => navigate('/projects')} icon="💼" />
              <GhostButton label="Contact Me" onClick={() => navigate('/contact')} icon="✉️" />
              <DownloadButton />
            </div>
          </motion.div>

        </motion.div>
      </section>
    </>
  );
};

export default Home;