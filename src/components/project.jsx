import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";

// ─────────────────────────────────────────────────────────────
// VIDEO CONFIG — set IS_EMBED = false for local mp4
// ─────────────────────────────────────────────────────────────
const VIDEO_URL = "Screen Recording.mp4";
const IS_EMBED  = false;

// ─────────────────────────────────────────────────────────────
// SCREENSHOTS — put images in /public/expense/
// ─────────────────────────────────────────────────────────────
const screenshots = [
  { src: "image5.png",                    label: "Make.com – Telegram → Sheets Pipeline" },
  { src: "image3.png",   label: "Google Sheets – Live Expense Log" },
  { src: "image4.png",   label: "Gmail – Daily Expense Report" },
  { src: "image1.png",   label: "Google Sheets – Running Total" },
  { src: "image2.png",   label: "Make.com – Email Scenario" },
];

// ─────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────
const C = {
  // Expense tracker (project 02 → now top)
  violet:       "#7c3aed",
  violetLight:  "#8b5cf6",
  violetGlow:   "rgba(124,58,237,0.18)",
  violetPale:   "#ede9fe",
  // Customer analytics (project 01 → now bottom)
  azure:        "#1d4ed8",
  azureLight:   "#3b82f6",
  azureGlow:    "rgba(29,78,216,0.18)",
  azurePale:    "#eff6ff",
  // Neutrals
  ink:          "#0a0a0f",
  inkLight:     "#0f172a",
  slate:        "#334155",
  muted:        "#64748b",
  ghost:        "#94a3b8",
  border:       "#e2e8f0",
  surface:      "#f8fafc",
  white:        "#ffffff",
};

const TAGS_EXPENSE = [
  { label: "Make.com",              color: C.violet,  bg: C.violetPale },
  { label: "Telegram Bot",          color: "#0369a1", bg: "#e0f2fe"    },
  { label: "Google Sheets",         color: "#15803d", bg: "#dcfce7"    },
  { label: "Gmail API",             color: "#b91c1c", bg: "#fee2e2"    },
  { label: "No-code / Automation",  color: "#92400e", bg: "#fef3c7"    },
];

const FEATURES = [
  { icon: "✈️", title: "Telegram Input",     desc: "Send expenses as plain messages — bot parses type, method and amount instantly." },
  { icon: "📊", title: "Sheets Logging",     desc: "Each entry auto-appended with date, time and running total in real time."        },
  { icon: "📧", title: "Daily Email Digest", desc: "Styled HTML summary delivered to your inbox every morning at 6 AM."              },
  { icon: "⚡", title: "Fully Automated",    desc: "End-to-end on Make.com's free tier. No servers, no manual steps, 24/7."          },
];

const PIPELINE_1 = [
  { icon: "✈️", label: "Telegram",    sub: "Watch Updates" },
  { icon: "🔤", label: "Text Parser", sub: "Match Pattern" },
  { icon: "🔁", label: "Iterator",    sub: "Loop Items"    },
  { icon: "🔀", label: "Router",      sub: "Branch Logic"  },
  { icon: "📊", label: "Sheets",      sub: "Add a Row"     },
];

const PIPELINE_2 = [
  { icon: "📋", label: "Sheets", sub: "Get Range"  },
  { icon: "🔧", label: "Tools",  sub: "Aggregator" },
  { icon: "📧", label: "Gmail",  sub: "Send Email" },
];

// ─────────────────────────────────────────────────────────────
// ANIMATED COUNTER
// ─────────────────────────────────────────────────────────────
const Counter = ({ to, suffix = "" }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{val}{suffix}</span>;
};

// ─────────────────────────────────────────────────────────────
// TYPING TEXT ANIMATION
// ─────────────────────────────────────────────────────────────
const TypingText = ({ words, color }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!deleting && charIndex < current.length) {
        setCharIndex(c => c + 1);
      } else if (!deleting && charIndex === current.length) {
        setTimeout(() => setDeleting(true), 1400);
      } else if (deleting && charIndex > 0) {
        setCharIndex(c => c - 1);
      } else {
        setDeleting(false);
        setWordIndex(i => (i + 1) % words.length);
      }
    }, deleting ? 55 : 90);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words]);

  return (
    <span style={{ color }}>
      {words[wordIndex].slice(0, charIndex)}
      <span style={{
        display: "inline-block", width: "2px", height: "1em",
        background: color, marginLeft: "2px", verticalAlign: "text-bottom",
        animation: "blink 1s step-end infinite",
      }} />
    </span>
  );
};

// ─────────────────────────────────────────────────────────────
// SHARED: SECTION LABEL
// ─────────────────────────────────────────────────────────────
const SectionLabel = ({ children, color = C.ghost }) => (
  <p style={{
    fontSize: "0.6rem", fontWeight: 800,
    letterSpacing: "0.22em", textTransform: "uppercase",
    color, marginBottom: "16px", display: "flex",
    alignItems: "center", gap: "8px",
  }}>
    <span style={{ display: "inline-block", width: "20px", height: "1.5px", background: color, borderRadius: "2px" }} />
    {children}
  </p>
);

// ─────────────────────────────────────────────────────────────
// PIPELINE NODE
// ─────────────────────────────────────────────────────────────
const PipelineNode = ({ icon, label, sub, accentColor }) => (
  <motion.div
    whileHover={{ y: -3, boxShadow: `0 8px 24px ${accentColor}30` }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    style={{
      background: C.white, border: `1px solid ${C.border}`,
      borderRadius: "12px", padding: "12px 16px",
      textAlign: "center", minWidth: "82px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    }}
  >
    <div style={{ fontSize: "1.2rem" }}>{icon}</div>
    <div style={{ fontSize: "0.66rem", fontWeight: 800, color: C.inkLight, marginTop: "5px" }}>{label}</div>
    <div style={{ fontSize: "0.58rem", color: C.ghost, marginTop: "2px" }}>{sub}</div>
  </motion.div>
);

const Arrow = ({ color }) => (
  <motion.span
    animate={{ x: [0, 3, 0] }}
    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
    style={{ color: color || C.border, fontSize: "1rem", flexShrink: 0 }}
  >
    →
  </motion.span>
);

// ─────────────────────────────────────────────────────────────
// SCREENSHOT GALLERY
// ─────────────────────────────────────────────────────────────
const ScreenshotGallery = ({ accentColor }) => {
  const [active, setActive]     = useState(0);
  const [lightbox, setLightbox] = useState(false);

  return (
    <div style={{ marginBottom: "52px" }}>
      <SectionLabel color={C.ghost}>Project Screenshots</SectionLabel>

      <motion.div
        key={active}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={() => setLightbox(true)}
        style={{
          width: "100%", aspectRatio: "16/9",
          borderRadius: "16px", overflow: "hidden",
          border: `1px solid ${C.border}`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px ${accentColor}18`,
          cursor: "zoom-in", background: C.surface,
          position: "relative", marginBottom: "12px",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <img
          src={screenshots[active].src}
          alt={screenshots[active].label}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
        />
        <div style={{
          display: "none", position: "absolute", inset: 0,
          flexDirection: "column", alignItems: "center", justifyContent: "center",
          background: C.surface, gap: "10px",
        }}>
          <span style={{ fontSize: "3rem" }}>🖼️</span>
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: C.muted }}>{screenshots[active].label}</span>
          <span style={{ fontSize: "0.7rem", color: C.ghost }}>Add image to /public/expense/</span>
        </div>
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(transparent, rgba(0,0,0,0.55))",
          padding: "40px 18px 14px",
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        }}>
          <span style={{ color: "#fff", fontSize: "0.78rem", fontWeight: 600 }}>
            {screenshots[active].label}
          </span>
          <span style={{
            background: `${accentColor}cc`, backdropFilter: "blur(6px)",
            borderRadius: "8px", padding: "4px 12px",
            color: "#fff", fontSize: "0.64rem", fontWeight: 600,
          }}>🔍 Enlarge</span>
        </div>
        {/* Counter badge */}
        <div style={{
          position: "absolute", top: "14px", right: "14px",
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)",
          borderRadius: "999px", padding: "3px 10px",
          fontSize: "0.62rem", fontWeight: 700, color: "#fff",
        }}>
          {active + 1} / {screenshots.length}
        </div>
      </motion.div>

      {/* Thumbnails */}
      <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
        {screenshots.map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setActive(i)}
            style={{
              flexShrink: 0, width: "96px", height: "60px",
              borderRadius: "10px", overflow: "hidden", cursor: "pointer",
              border: active === i ? `2.5px solid ${accentColor}` : `2px solid ${C.border}`,
              boxShadow: active === i ? `0 0 0 3px ${accentColor}30` : "none",
              background: C.surface,
              transition: "border 0.15s, box-shadow 0.15s",
            }}
          >
            <img src={s.src} alt={s.label}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { e.target.style.opacity = "0"; }}
            />
          </motion.div>
        ))}
      </div>

      {/* Pill indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: "5px", marginTop: "14px" }}>
        {screenshots.map((_, i) => (
          <motion.div
            key={i}
            onClick={() => setActive(i)}
            animate={{ width: active === i ? "22px" : "6px", background: active === i ? accentColor : C.border }}
            transition={{ duration: 0.25 }}
            style={{ height: "6px", borderRadius: "999px", cursor: "pointer" }}
          />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.92)", zIndex: 9000,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "24px",
            }}
          >
            <motion.img
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              src={screenshots[active].src}
              alt={screenshots[active].label}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "92vw", maxHeight: "88vh",
                borderRadius: "14px",
                boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
                objectFit: "contain",
              }}
            />
            <button onClick={() => setLightbox(false)} style={{
              position: "fixed", top: "20px", right: "20px",
              width: "42px", height: "42px", borderRadius: "50%",
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff", fontSize: "1.1rem", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// VIDEO PLAYER
// ─────────────────────────────────────────────────────────────
const VideoPlayer = ({ accentColor }) => {
  const [open, setOpen] = useState(false);
  const hasVideo = VIDEO_URL !== "YOUR_VIDEO_URL_HERE";

  return (
    <>
      <SectionLabel color={C.ghost}>Demo Video</SectionLabel>
      <motion.div
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.008, boxShadow: `0 16px 48px ${accentColor}30` }}
        style={{
          width: "100%", aspectRatio: "16/9",
          borderRadius: "16px", overflow: "hidden", cursor: "pointer",
          background: `linear-gradient(135deg, ${C.ink} 0%, #0f172a 50%, #1a0533 100%)`,
          border: `1px solid ${accentColor}30`,
          boxShadow: `0 8px 28px rgba(0,0,0,0.15)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", marginBottom: "52px",
          transition: "box-shadow 0.3s",
        }}
      >
        {/* Grid pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(${accentColor}12 1px, transparent 1px), linear-gradient(90deg, ${accentColor}12 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }} />
        {/* Radial glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at center, ${accentColor}28 0%, transparent 65%)`,
        }} />
        {/* Play button */}
        <motion.div
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: "76px", height: "76px", borderRadius: "50%",
            background: C.white,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 12px 40px rgba(0,0,0,0.35), 0 0 0 8px ${accentColor}20`,
            zIndex: 1,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill={accentColor}>
            <path d="M8 5v14l11-7z" />
          </svg>
        </motion.div>
        {/* Badge */}
        <div style={{
          position: "absolute", top: "16px", left: "16px",
          background: hasVideo ? `${accentColor}ee` : "rgba(15,23,42,0.7)",
          backdropFilter: "blur(8px)", borderRadius: "8px",
          padding: "5px 14px", fontSize: "0.68rem", fontWeight: 700,
          color: "#fff", letterSpacing: "0.05em",
        }}>
          {hasVideo ? "▶ Watch Demo" : "🎬 Coming Soon"}
        </div>
        <div style={{
          position: "absolute", bottom: "14px", right: "14px",
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
          borderRadius: "6px", padding: "4px 12px",
          fontSize: "0.64rem", color: "rgba(255,255,255,0.6)",
        }}>
          Click to play
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.93)", zIndex: 9000,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "24px",
            }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%", maxWidth: "960px",
                borderRadius: "18px", overflow: "hidden",
                boxShadow: `0 48px 120px rgba(0,0,0,0.8), 0 0 0 1px ${accentColor}40`,
                aspectRatio: "16/9", background: "#000",
                position: "relative",
              }}
            >
              {!hasVideo ? (
                <div style={{
                  width: "100%", height: "100%",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(135deg, #1e1b4b, #1e3a5f)",
                  color: "#fff", gap: "12px",
                }}>
                  <span style={{ fontSize: "3rem" }}>🎬</span>
                  <p style={{ fontWeight: 700, fontSize: "1.1rem" }}>Video Coming Soon</p>
                </div>
              ) : IS_EMBED ? (
                <iframe src={VIDEO_URL} style={{ width: "100%", height: "100%", border: "none" }} allow="autoplay; fullscreen" allowFullScreen />
              ) : (
                <video src={VIDEO_URL} controls autoPlay style={{ width: "100%", height: "100%" }} />
              )}
              <button onClick={() => setOpen(false)} style={{
                position: "absolute", top: "14px", right: "14px",
                width: "38px", height: "38px", borderRadius: "50%",
                background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff", fontSize: "1rem", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─────────────────────────────────────────────────────────────
// SECTION DIVIDER
// ─────────────────────────────────────────────────────────────
const SectionDivider = ({ label }) => (
  <div style={{
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "48px 0",
    background: `linear-gradient(180deg, ${C.surface} 0%, #f1f5f9 100%)`,
    borderTop: `1px solid ${C.border}`,
    borderBottom: `1px solid ${C.border}`,
    gap: "14px",
  }}>
    <span style={{
      fontSize: "0.58rem", fontWeight: 800,
      letterSpacing: "0.22em", textTransform: "uppercase",
      color: C.ghost,
    }}>{label}</span>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.2, 1, 0.2], y: [0, 5, 0] }}
          transition={{ duration: 1.4, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
            <path d="M2 2L11 10L20 2" stroke={C.violet} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// PROJECTS SECTION HEADER
// ─────────────────────────────────────────────────────────────
const ProjectsSectionHeader = () => (
  <div style={{
    background: C.ink,
    padding: "80px 24px 72px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  }}>
    {/* Background grid */}
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: `linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)`,
      backgroundSize: "48px 48px",
    }} />
    {/* Glow blobs */}
    <div style={{ position: "absolute", top: "-60px", left: "20%", width: "320px", height: "320px", borderRadius: "50%", background: `radial-gradient(circle, ${C.violetGlow} 0%, transparent 70%)`, filter: "blur(40px)" }} />
    <div style={{ position: "absolute", bottom: "-40px", right: "25%", width: "260px", height: "260px", borderRadius: "50%", background: `radial-gradient(circle, ${C.azureGlow} 0%, transparent 70%)`, filter: "blur(40px)" }} />

    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{ position: "relative", zIndex: 1 }}
    >
      {/* Eyebrow */}
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          display: "inline-block",
          fontSize: "0.6rem", fontWeight: 800,
          letterSpacing: "0.25em", textTransform: "uppercase",
          color: C.violetLight, background: `${C.violetLight}18`,
          border: `1px solid ${C.violetLight}40`,
          borderRadius: "999px", padding: "6px 18px",
          marginBottom: "22px",
        }}
      >
        Portfolio — 2 Projects
      </motion.span>

      <h1 style={{
        fontSize: "clamp(2rem, 5vw, 3.4rem)",
        fontWeight: 900, color: C.white,
        letterSpacing: "-0.035em", lineHeight: 1.08,
        marginBottom: "18px",
        fontFamily: "'Georgia', serif",
      }}>
        Work I've{" "}
        <TypingText words={["built.", "shipped.", "automated.", "designed."]} color={C.violetLight} />
      </h1>

      <p style={{
        fontSize: "1rem", color: C.ghost,
        lineHeight: 1.75, maxWidth: "420px",
        margin: "0 auto 36px",
      }}>
        From data analytics to no-code automation pipelines — real projects, real impact.
      </p>

      {/* Stats row */}
      <div style={{ display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap", marginBottom: "36px" }}>
        {[
          { num: 2, suffix: "", label: "Projects" },
          { num: 100, suffix: "%", label: "Automated" },
          { num: 24, suffix: "/7", label: "Running" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            style={{ textAlign: "center" }}
          >
            <div style={{ fontSize: "1.8rem", fontWeight: 900, color: C.white, lineHeight: 1 }}>
              <Counter to={s.num} suffix={s.suffix} />
            </div>
            <div style={{ fontSize: "0.62rem", color: C.ghost, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "4px" }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project pills */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
        {[
          { num: "01", label: "Expense Tracker",  color: C.violetLight, bg: `${C.violetLight}18`, border: `${C.violetLight}40` },
          { num: "02", label: "Customer Analytics", color: C.azureLight, bg: `${C.azureLight}18`, border: `${C.azureLight}40` },
        ].map((p) => (
          <div key={p.num} style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: p.bg, border: `1px solid ${p.border}`,
            borderRadius: "999px", padding: "7px 18px",
          }}>
            <span style={{ fontSize: "0.6rem", fontWeight: 900, color: p.color, letterSpacing: "0.12em" }}>{p.num}</span>
            <span style={{ width: "1px", height: "12px", background: `${p.color}40` }} />
            <span style={{ fontSize: "0.74rem", fontWeight: 600, color: C.white }}>{p.label}</span>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div style={{ marginTop: "36px", display: "flex", flexDirection: "column", alignItems: "center", gap: "7px" }}>
        <span style={{ fontSize: "0.6rem", color: C.ghost, letterSpacing: "0.12em", textTransform: "uppercase" }}>scroll to explore</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12l7 7 7-7" stroke={C.violetLight} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// PROJECT BADGE
// ─────────────────────────────────────────────────────────────
const ProjectBadge = ({ number, total, color }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: "7px",
    background: C.surface, border: `1px solid ${C.border}`,
    borderRadius: "10px", padding: "5px 14px",
    marginBottom: "16px",
  }}>
    <span style={{ fontSize: "0.72rem", fontWeight: 900, color }}>{number}</span>
    <span style={{ width: "1px", height: "13px", background: C.border }} />
    <span style={{ fontSize: "0.66rem", color: C.ghost, fontWeight: 600 }}>of {total}</span>
  </div>
);

// ─────────────────────────────────────────────────────────────
// PROJECT 01 — Daily Expense Tracker (NOW TOP)
// ─────────────────────────────────────────────────────────────
const DailyExpenseTracker = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      style={{
        background: C.white, padding: "80px 24px 100px",
        borderBottom: `1px solid ${C.border}`, position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent bar */}
      <div style={{
        position: "absolute", left: 0, top: "80px", bottom: "100px",
        width: "4px",
        background: `linear-gradient(180deg, ${C.violet}, ${C.violetLight}, #c4b5fd)`,
        borderRadius: "0 4px 4px 0",
      }} />
      {/* Subtle bg glow */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: "40%", height: "300px",
        background: `radial-gradient(ellipse at top right, ${C.violetGlow} 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          style={{ marginBottom: "52px" }}
        >
          <ProjectBadge number="01" total="02" color={C.violet} />

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
            <span style={{
              fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase",
              color: C.violet, background: C.violetPale, border: `1px solid ${C.violet}30`,
              borderRadius: "999px", padding: "5px 16px",
            }}>Automation</span>
            <span style={{
              fontSize: "0.62rem", fontWeight: 700,
              color: "#15803d", background: "#dcfce7", border: "1px solid #bbf7d0",
              borderRadius: "999px", padding: "5px 14px",
              display: "inline-flex", alignItems: "center", gap: "5px",
            }}>
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }}
              />
              Live &amp; Running
            </span>
          </div>

          <h2 style={{
            fontSize: "clamp(1.9rem, 4.5vw, 3rem)",
            fontWeight: 900, color: C.inkLight,
            letterSpacing: "-0.03em", lineHeight: 1.1,
            marginBottom: "6px",
            fontFamily: "'Georgia', serif",
          }}>
            Daily Expense
          </h2>
          <h2 style={{
            fontSize: "clamp(1.9rem, 4.5vw, 3rem)",
            fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1,
            marginBottom: "22px",
            fontFamily: "'Georgia', serif",
            background: `linear-gradient(135deg, ${C.violet}, ${C.violetLight})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Tracker
          </h2>

          <p style={{
            color: C.slate, fontSize: "1rem",
            lineHeight: 1.8, maxWidth: "560px", marginBottom: "28px",
          }}>
            A fully automated personal finance pipeline — text an expense to a Telegram bot,
            watch it appear in Google Sheets instantly, and receive a clean daily email summary
            every morning. Built on Make.com's free tier with zero code written.
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {TAGS_EXPENSE.map((t) => (
              <motion.span
                key={t.label}
                whileHover={{ scale: 1.06 }}
                style={{
                  fontSize: "0.7rem", fontWeight: 700,
                  padding: "5px 14px", borderRadius: "999px",
                  color: t.color, background: t.bg,
                  border: `1px solid ${t.color}28`,
                  cursor: "default",
                }}
              >{t.label}</motion.span>
            ))}
          </div>
        </motion.div>

        {/* Screenshots */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <ScreenshotGallery accentColor={C.violet} />
        </motion.div>

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          <VideoPlayer accentColor={C.violet} />
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
          style={{ marginBottom: "52px" }}
        >
          <SectionLabel>Key Features</SectionLabel>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(195px, 1fr))",
            gap: "14px",
          }}>
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                onHoverStart={() => setHoveredFeature(i)}
                onHoverEnd={() => setHoveredFeature(null)}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.07, duration: 0.5, type: "spring", stiffness: 200 }}
                style={{
                  background: hoveredFeature === i ? `${C.violetGlow}` : C.surface,
                  border: hoveredFeature === i ? `1px solid ${C.violetLight}40` : `1px solid ${C.border}`,
                  borderRadius: "14px", padding: "22px 20px",
                  boxShadow: hoveredFeature === i ? `0 8px 24px ${C.violetGlow}` : "0 1px 4px rgba(0,0,0,0.04)",
                  transition: "all 0.22s ease",
                }}
              >
                <span style={{ fontSize: "1.7rem", display: "block", marginBottom: "12px" }}>{f.icon}</span>
                <h3 style={{ fontSize: "0.87rem", fontWeight: 800, color: C.inkLight, marginBottom: "7px" }}>{f.title}</h3>
                <p style={{ fontSize: "0.76rem", color: C.muted, lineHeight: 1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            background: C.surface, border: `1px solid ${C.border}`,
            borderRadius: "18px", padding: "30px 28px 26px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          }}
        >
          <SectionLabel>Automation Pipeline</SectionLabel>

          <p style={{ fontSize: "0.68rem", fontWeight: 700, color: C.ghost, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            On message received
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", marginBottom: "26px" }}>
            {PIPELINE_1.map((node, i) => (
              <React.Fragment key={i}>
                {i > 0 && <Arrow color={`${C.violet}60`} />}
                <PipelineNode {...node} accentColor={C.violet} />
              </React.Fragment>
            ))}
          </div>

          <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${C.border}, transparent)`, marginBottom: "26px" }} />

          <p style={{ fontSize: "0.68rem", fontWeight: 700, color: C.ghost, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Daily at 6:00 AM
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
            {PIPELINE_2.map((node, i) => (
              <React.Fragment key={i}>
                {i > 0 && <Arrow color={`${C.violet}60`} />}
                <PipelineNode {...node} accentColor={C.violet} />
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// PROJECT 02 — Customer Analytics (NOW BOTTOM)
// ─────────────────────────────────────────────────────────────
const CustomerAnalytics = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const ANALYTICS_FEATURES = [
    { icon: "🧠", title: "Customer Segmentation", desc: "K-means clustering to identify distinct customer groups and behavioral patterns." },
    { icon: "💬", title: "Sentiment Analysis",     desc: "NLP-powered review analysis to extract positive, neutral, and negative signals." },
    { icon: "📈", title: "Actionable Insights",    desc: "Visual dashboards translating raw data into clear business recommendations." },
    { icon: "🔬", title: "Data Science Stack",     desc: "Built with Python, Pandas, Scikit-learn, and Matplotlib for end-to-end analysis." },
  ];

  return (
    <section
      ref={ref}
      style={{
        background: C.white, padding: "80px 24px 100px",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Accent bar */}
      <div style={{
        position: "absolute", left: 0, top: "80px", bottom: "100px",
        width: "4px",
        background: `linear-gradient(180deg, ${C.azure}, ${C.azureLight}, #93c5fd)`,
        borderRadius: "0 4px 4px 0",
      }} />
      {/* Subtle bg glow */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: "40%", height: "300px",
        background: `radial-gradient(ellipse at top right, ${C.azureGlow} 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          style={{ marginBottom: "52px" }}
        >
          <ProjectBadge number="02" total="02" color={C.azure} />

          <div style={{ marginBottom: "20px" }}>
            <span style={{
              fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase",
              color: C.azure, background: C.azurePale, border: `1px solid ${C.azure}30`,
              borderRadius: "999px", padding: "5px 16px",
            }}>Data Analytics</span>
          </div>

          <h2 style={{
            fontSize: "clamp(1.9rem, 4.5vw, 3rem)",
            fontWeight: 900, color: C.inkLight,
            letterSpacing: "-0.03em", lineHeight: 1.1,
            marginBottom: "6px",
            fontFamily: "'Georgia', serif",
          }}>
            Customer Segmentation
          </h2>
          <h2 style={{
            fontSize: "clamp(1.9rem, 4.5vw, 3rem)",
            fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1,
            marginBottom: "22px",
            fontFamily: "'Georgia', serif",
            background: `linear-gradient(135deg, ${C.azure}, ${C.azureLight})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            &amp; Review Sentiment
          </h2>

          <p style={{
            color: C.slate, fontSize: "1rem",
            lineHeight: 1.8, maxWidth: "520px", marginBottom: "36px",
          }}>
            Analyzes customer segments and review sentiments to uncover actionable business insights
            using data science techniques — from raw data to clear visual dashboards.
          </p>

          {/* Tech tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "40px" }}>
            {[
              { label: "Python",       color: "#1d4ed8", bg: "#eff6ff" },
              { label: "Pandas",       color: "#15803d", bg: "#dcfce7" },
              { label: "Scikit-learn", color: "#b91c1c", bg: "#fee2e2" },
              { label: "Matplotlib",   color: "#92400e", bg: "#fef3c7" },
              { label: "NLP",          color: "#6d28d9", bg: "#ede9fe" },
            ].map((t) => (
              <motion.span
                key={t.label}
                whileHover={{ scale: 1.06 }}
                style={{
                  fontSize: "0.7rem", fontWeight: 700,
                  padding: "5px 14px", borderRadius: "999px",
                  color: t.color, background: t.bg,
                  border: `1px solid ${t.color}28`,
                  cursor: "default",
                }}
              >{t.label}</motion.span>
            ))}
          </div>

          {/* Feature grid */}
          <SectionLabel>What it does</SectionLabel>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(195px, 1fr))",
            gap: "14px", marginBottom: "48px",
          }}>
            {ANALYTICS_FEATURES.map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.5, type: "spring", stiffness: 200 }}
                style={{
                  background: C.surface, border: `1px solid ${C.border}`,
                  borderRadius: "14px", padding: "22px 20px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  transition: "all 0.22s ease",
                }}
                onHoverStart={(e) => { e.currentTarget.style.borderColor = `${C.azureLight}40`; e.currentTarget.style.background = C.azureGlow; }}
                onHoverEnd={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.surface; }}
              >
                <span style={{ fontSize: "1.7rem", display: "block", marginBottom: "12px" }}>{f.icon}</span>
                <h3 style={{ fontSize: "0.87rem", fontWeight: 800, color: C.inkLight, marginBottom: "7px" }}>{f.title}</h3>
                <p style={{ fontSize: "0.76rem", color: C.muted, lineHeight: 1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              background: `linear-gradient(135deg, ${C.inkLight} 0%, #1e3a5f 100%)`,
              borderRadius: "18px", padding: "36px 32px",
              position: "relative", overflow: "hidden",
            }}
          >
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: `linear-gradient(${C.azureGlow} 1px, transparent 1px), linear-gradient(90deg, ${C.azureGlow} 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }} />
            <div style={{
              position: "absolute", top: 0, right: 0, width: "200px", height: "200px",
              background: `radial-gradient(circle, ${C.azureGlow} 0%, transparent 70%)`,
            }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ fontSize: "1.6rem" }}>📱</span>
                <span style={{
                  fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.16em",
                  color: C.azureLight, textTransform: "uppercase",
                  background: `${C.azureLight}18`, border: `1px solid ${C.azureLight}40`,
                  borderRadius: "999px", padding: "4px 12px",
                }}>Mobile App</span>
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: C.white, marginBottom: "8px" }}>
                Download the Android Build
              </h3>
              <p style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.65, marginBottom: "22px" }}>
                Explore the analytics live on your Android device via Firebase App Distribution.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: `0 8px 28px ${C.azureGlow}` }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  padding: "13px 28px",
                  background: `linear-gradient(135deg, ${C.azure}, ${C.azureLight})`,
                  color: C.white, fontWeight: 700,
                  borderRadius: "12px", border: "none",
                  cursor: "pointer", fontSize: "0.88rem",
                  boxShadow: `0 4px 18px ${C.azureGlow}`,
                  display: "inline-flex", alignItems: "center", gap: "9px",
                }}
                onClick={() => window.open(
                  "https://appdistribution.firebase.google.com/testerapps/1:195095990413:android:ab80021ee87e6ea70a92c4/releases/3ju5r5sfigrbg?utm_source=firebase-console",
                  "_blank"
                )}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download Latest Build
              </motion.button>
              <p style={{ marginTop: "12px", fontSize: "0.74rem", color: "#64748b" }}>
                📌 Mobile only — link won't open on desktop.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// GLOBAL STYLES (injected once)
// ─────────────────────────────────────────────────────────────
const GlobalStyles = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
      ::-webkit-scrollbar { width: 6px; height: 6px; }
      ::-webkit-scrollbar-track { background: #f8fafc; }
      ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 999px; }
      ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
};

// ─────────────────────────────────────────────────────────────
// ROOT EXPORT
// ─────────────────────────────────────────────────────────────
const MiniProjectHeader = () => (
  <>
    <GlobalStyles />
    <ProjectsSectionHeader />
    <DailyExpenseTracker />
    <SectionDivider label="Next Project" />
    <CustomerAnalytics />
  </>
);

export default MiniProjectHeader;