import React, { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────
// ANIMATED COUNTER (header only)
// ─────────────────────────────────────────────────────────────
const Counter = ({ to, suffix = "" }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

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
// TYPING TEXT (header only)
// ─────────────────────────────────────────────────────────────
const TypingText = ({ words, color }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting]   = useState(false);

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
// VIDEO CONFIG — set IS_EMBED = false for local mp4
// ─────────────────────────────────────────────────────────────
const VIDEO_URL = "Screen Recording.mp4";
const IS_EMBED  = false;

// ─────────────────────────────────────────────────────────────
// SCREENSHOTS — put images in /public/expense/
// ─────────────────────────────────────────────────────────────
const screenshots = [
  { src: "image5.png",  label: "Make.com – Telegram → Sheets Pipeline" },
  { src: "image3.png",  label: "Google Sheets – Live Expense Log" },
  { src: "image4.png",  label: "Gmail – Daily Expense Report" },
  { src: "image1.png",  label: "Google Sheets – Running Total" },
  { src: "image2.png",  label: "Make.com – Email Scenario" },
];

// ─────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────
const C = {
  violet:       "#7c3aed",
  violetLight:  "#8b5cf6",
  violetGlow:   "rgba(124,58,237,0.18)",
  violetPale:   "#ede9fe",
  azure:        "#1d4ed8",
  azureLight:   "#3b82f6",
  azureGlow:    "rgba(29,78,216,0.18)",
  azurePale:    "#eff6ff",
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
const PipelineNode = ({ icon, label, sub }) => (
  <div style={{
    background: C.white, border: `1px solid ${C.border}`,
    borderRadius: "12px", padding: "12px 16px",
    textAlign: "center", minWidth: "82px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  }}>
    <div style={{ fontSize: "1.2rem" }}>{icon}</div>
    <div style={{ fontSize: "0.66rem", fontWeight: 800, color: C.inkLight, marginTop: "5px" }}>{label}</div>
    <div style={{ fontSize: "0.58rem", color: C.ghost, marginTop: "2px" }}>{sub}</div>
  </div>
);

const Arrow = ({ color }) => (
  <span style={{ color: color || C.border, fontSize: "1rem", flexShrink: 0 }}>→</span>
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

      <div
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
        <div style={{
          position: "absolute", top: "14px", right: "14px",
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)",
          borderRadius: "999px", padding: "3px 10px",
          fontSize: "0.62rem", fontWeight: 700, color: "#fff",
        }}>
          {active + 1} / {screenshots.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
        {screenshots.map((s, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            style={{
              flexShrink: 0, width: "96px", height: "60px",
              borderRadius: "10px", overflow: "hidden", cursor: "pointer",
              border: active === i ? `2.5px solid ${accentColor}` : `2px solid ${C.border}`,
              boxShadow: active === i ? `0 0 0 3px ${accentColor}30` : "none",
              background: C.surface,
            }}
          >
            <img src={s.src} alt={s.label}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { e.target.style.opacity = "0"; }}
            />
          </div>
        ))}
      </div>

      {/* Pill indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: "5px", marginTop: "14px" }}>
        {screenshots.map((_, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            style={{
              height: "6px", borderRadius: "999px", cursor: "pointer",
              width: active === i ? "22px" : "6px",
              background: active === i ? accentColor : C.border,
              transition: "width 0.25s, background 0.25s",
            }}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.92)", zIndex: 9000,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px",
          }}
        >
          <img
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
        </div>
      )}
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
      <div
        onClick={() => setOpen(true)}
        style={{
          width: "100%", aspectRatio: "16/9",
          borderRadius: "16px", overflow: "hidden", cursor: "pointer",
          background: C.ink,
          border: `1px solid ${accentColor}30`,
          boxShadow: `0 8px 28px rgba(0,0,0,0.15)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", marginBottom: "52px",
        }}
      >
        <img
          src="image3.png"
          alt="Demo video thumbnail"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
          }}
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.45)",
        }} />
        {/* Play button */}
        <div style={{
          width: "76px", height: "76px", borderRadius: "50%",
          background: C.white,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 0 8px ${accentColor}40`,
          zIndex: 1, position: "relative",
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill={accentColor}>
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <div style={{
          position: "absolute", top: "16px", left: "16px", zIndex: 1,
          background: hasVideo ? `${accentColor}ee` : "rgba(15,23,42,0.7)",
          backdropFilter: "blur(8px)", borderRadius: "8px",
          padding: "5px 14px", fontSize: "0.68rem", fontWeight: 700,
          color: "#fff", letterSpacing: "0.05em",
        }}>
          {hasVideo ? "▶ Watch Demo" : "🎬 Coming Soon"}
        </div>
        <div style={{
          position: "absolute", bottom: "14px", right: "14px", zIndex: 1,
          background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)",
          borderRadius: "6px", padding: "4px 12px",
          fontSize: "0.64rem", color: "rgba(255,255,255,0.8)",
        }}>
          Click to play
        </div>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.93)", zIndex: 9000,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
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
          </div>
        </div>
      )}
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
        <svg
          key={i} width="22" height="12" viewBox="0 0 22 12" fill="none"
          style={{ animation: `bounceArrow 1.4s ease-in-out ${i * 0.2}s infinite` }}
        >
          <path d="M2 2L11 10L20 2" stroke={C.violet} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// PROJECTS SECTION HEADER — with original animations restored
// ─────────────────────────────────────────────────────────────
const ProjectsSectionHeader = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const fadeUp = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  return (
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

      {/* Animated glow blobs */}
      <div style={{
        position: "absolute", top: "-60px", left: "20%",
        width: "320px", height: "320px", borderRadius: "50%",
        background: `radial-gradient(circle, ${C.violetGlow} 0%, transparent 70%)`,
        filter: "blur(40px)",
        animation: "floatBlob1 7s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "-40px", right: "25%",
        width: "260px", height: "260px", borderRadius: "50%",
        background: `radial-gradient(circle, ${C.azureGlow} 0%, transparent 70%)`,
        filter: "blur(40px)",
        animation: "floatBlob2 9s ease-in-out infinite",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Eyebrow badge — fades in */}
        <div style={{ ...fadeUp(0.05) }}>
          <span style={{
            display: "inline-block",
            fontSize: "0.6rem", fontWeight: 800,
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: C.violetLight, background: `${C.violetLight}18`,
            border: `1px solid ${C.violetLight}40`,
            borderRadius: "999px", padding: "6px 18px",
            marginBottom: "22px",
            animation: "pulseGlow 3s ease-in-out infinite",
          }}>
            Portfolio — 2 Projects
          </span>
        </div>

        {/* Headline with TypingText */}
        <div style={{ ...fadeUp(0.15) }}>
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
        </div>

        {/* Subtitle */}
        <div style={{ ...fadeUp(0.25) }}>
          <p style={{
            fontSize: "1rem", color: C.ghost,
            lineHeight: 1.75, maxWidth: "420px",
            margin: "0 auto 36px",
          }}>
            From data pipelines to no-code automation — projects built while learning CS, solving real problems.
          </p>
        </div>

        {/* Animated counter stats */}
        <div style={{ ...fadeUp(0.35), display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap", marginBottom: "36px" }}>
          {[
            { num: 2,   suffix: "",   label: "Projects"  },
            { num: 100, suffix: "%",  label: "Automated" },
            { num: 24,  suffix: "/7", label: "Running"   },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: C.white, lineHeight: 1 }}>
                <Counter to={s.num} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: "0.62rem", color: C.ghost, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "4px" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Project pills with hover scale */}
        <div style={{ ...fadeUp(0.45), display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
          {[
            { num: "01", label: "Expense Tracker",    color: C.violetLight, bg: `${C.violetLight}18`, border: `${C.violetLight}40`, id: "project-expense"   },
            { num: "02", label: "Customer Analytics", color: C.azureLight,  bg: `${C.azureLight}18`,  border: `${C.azureLight}40`,  id: "project-analytics" },
          ].map((p) => (
            <div
              key={p.num}
              className="header-pill"
              onClick={() => scrollTo(p.id)}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: p.bg, border: `1px solid ${p.border}`,
                borderRadius: "999px", padding: "7px 18px",
                cursor: "pointer",
                transition: "transform 0.18s ease, box-shadow 0.18s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.07) translateY(-2px)"; e.currentTarget.style.boxShadow = `0 6px 20px ${p.color}30`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1) translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <span style={{ fontSize: "0.6rem", fontWeight: 900, color: p.color, letterSpacing: "0.12em" }}>{p.num}</span>
              <span style={{ width: "1px", height: "12px", background: `${p.color}40` }} />
              <span style={{ fontSize: "0.74rem", fontWeight: 600, color: C.white }}>{p.label}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{ marginLeft: "2px" }}>
                <path d="M12 5v14M5 12l7 7 7-7" stroke={p.color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ))}
        </div>

        {/* Bouncing scroll hint */}
        <div style={{ ...fadeUp(0.55), marginTop: "36px", display: "flex", flexDirection: "column", alignItems: "center", gap: "7px" }}>
          <span style={{ fontSize: "0.6rem", color: C.ghost, letterSpacing: "0.12em", textTransform: "uppercase" }}>scroll to explore</span>
          <svg
            width="18" height="18" viewBox="0 0 24 24" fill="none"
            style={{ animation: "bounceArrow 1.5s ease-in-out infinite" }}
          >
            <path d="M12 5v14M5 12l7 7 7-7" stroke={C.violetLight} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

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
// SCROLL-TRIGGER HOOK
// ─────────────────────────────────────────────────────────────
const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

// ─────────────────────────────────────────────────────────────
// KEY FEATURES — new animated design
// ─────────────────────────────────────────────────────────────
const KeyFeaturesSection = () => {
  const [sectionRef, sectionVisible] = useScrollReveal(0.1);
  const [hovered, setHovered] = useState(null);

  const featureColors = [
    { accent: "#7c3aed", glow: "rgba(124,58,237,0.12)", light: "#ede9fe" },
    { accent: "#0369a1", glow: "rgba(3,105,161,0.12)",  light: "#e0f2fe" },
    { accent: "#15803d", glow: "rgba(21,128,61,0.12)",  light: "#dcfce7" },
    { accent: "#b45309", glow: "rgba(180,83,9,0.12)",   light: "#fef3c7" },
  ];

  return (
    <div ref={sectionRef} style={{ marginBottom: "52px" }}>
      {/* Section header */}
      <div style={{
        display: "flex", alignItems: "center", gap: "14px",
        marginBottom: "28px",
        opacity: sectionVisible ? 1 : 0,
        transform: sectionVisible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "10px",
          background: `linear-gradient(135deg, ${C.violet}, ${C.violetLight})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 4px 14px ${C.violetGlow}`,
          flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <div>
          <p style={{ fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: C.ghost, marginBottom: "2px" }}>What it does</p>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 900, color: C.inkLight, letterSpacing: "-0.02em" }}>Key Features</h3>
        </div>
      </div>

      {/* Feature cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "14px" }}>
        {FEATURES.map((f, i) => {
          const col = featureColors[i % featureColors.length];
          const isHovered = hovered === i;
          return (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "relative", overflow: "hidden",
                background: isHovered ? C.inkLight : C.white,
                border: `1.5px solid ${isHovered ? col.accent + "60" : C.border}`,
                borderRadius: "18px", padding: "26px 22px 22px",
                boxShadow: isHovered ? `0 12px 36px ${col.glow}, 0 0 0 1px ${col.accent}20` : "0 1px 6px rgba(0,0,0,0.05)",
                cursor: "default",
                transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.96)",
                transitionDelay: sectionVisible ? `${0.08 + i * 0.09}s` : "0s",
              }}
            >
              {/* Glow blob on hover */}
              <div style={{
                position: "absolute", top: "-20px", right: "-20px",
                width: "100px", height: "100px", borderRadius: "50%",
                background: `radial-gradient(circle, ${col.accent}30 0%, transparent 70%)`,
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.3s ease",
                pointerEvents: "none",
              }} />

              {/* Animated icon container */}
              <div style={{
                width: "48px", height: "48px", borderRadius: "14px",
                background: isHovered ? `linear-gradient(135deg, ${col.accent}, ${col.accent}bb)` : col.light,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "16px",
                transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                transform: isHovered ? "scale(1.12) rotate(-4deg)" : "scale(1) rotate(0deg)",
                boxShadow: isHovered ? `0 6px 18px ${col.glow}` : "none",
              }}>
                <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>{f.icon}</span>
              </div>

              {/* Number tag */}
              <div style={{
                position: "absolute", top: "20px", right: "18px",
                fontSize: "0.58rem", fontWeight: 900, letterSpacing: "0.1em",
                color: isHovered ? col.accent : C.ghost,
                opacity: 0.7, transition: "color 0.3s ease",
              }}>
                {String(i + 1).padStart(2, "0")}
              </div>

              <h3 style={{
                fontSize: "0.88rem", fontWeight: 800,
                color: isHovered ? "#fff" : C.inkLight,
                marginBottom: "8px", letterSpacing: "-0.01em",
                transition: "color 0.3s ease",
              }}>{f.title}</h3>

              <p style={{
                fontSize: "0.75rem", lineHeight: 1.68,
                color: isHovered ? "#94a3b8" : C.muted,
                transition: "color 0.3s ease",
              }}>{f.desc}</p>

              {/* Bottom accent bar */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "3px",
                background: `linear-gradient(90deg, ${col.accent}, ${col.accent}55)`,
                borderRadius: "0 0 18px 18px",
                transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
              }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// RESPONSIVE HOOK
// ─────────────────────────────────────────────────────────────
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 600);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
};

// ─────────────────────────────────────────────────────────────
// ANIMATED PIPELINE NODE — responsive
// ─────────────────────────────────────────────────────────────
const AnimatedPipelineNode = ({ icon, label, sub, accentColor, delay, visible, active, isMobile }) => (
  <div style={{
    position: "relative",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0) scale(1)" : "translateY(18px) scale(0.88)",
    transition: `opacity 0.5s ease ${delay}s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${delay}s`,
    width: isMobile ? "100%" : "auto",
  }}>
    {active && (
      <div style={{
        position: "absolute", inset: "-4px",
        borderRadius: "16px",
        border: `2px solid ${accentColor}50`,
        animation: "ringPulse 2s ease-in-out infinite",
        pointerEvents: "none",
      }} />
    )}
    <div style={{
      background: active ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
      border: `1.5px solid ${active ? accentColor + "80" : "rgba(255,255,255,0.1)"}`,
      borderRadius: "14px",
      padding: isMobile ? "14px 18px" : "14px 16px",
      textAlign: isMobile ? "left" : "center",
      display: isMobile ? "flex" : "block",
      alignItems: isMobile ? "center" : undefined,
      gap: isMobile ? "14px" : undefined,
      minWidth: isMobile ? undefined : "88px",
      boxShadow: active ? `0 6px 22px ${accentColor}30` : "0 2px 8px rgba(0,0,0,0.12)",
      transition: "all 0.4s ease",
      cursor: "default",
    }}>
      {/* Icon badge */}
      <div style={{
        width: isMobile ? "40px" : "auto",
        height: isMobile ? "40px" : "auto",
        borderRadius: isMobile ? "10px" : "0",
        background: isMobile ? (active ? `${accentColor}30` : "rgba(255,255,255,0.06)") : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        fontSize: isMobile ? "1.2rem" : "1.3rem",
        marginBottom: isMobile ? 0 : "6px",
      }}>
        {icon}
      </div>
      <div style={{ flex: isMobile ? 1 : undefined }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 800, color: active ? "#fff" : "rgba(255,255,255,0.85)", lineHeight: 1.3 }}>{label}</div>
        <div style={{ fontSize: "0.6rem", color: active ? accentColor : "rgba(255,255,255,0.4)", marginTop: "2px", fontWeight: 600 }}>{sub}</div>
      </div>
      {/* Active dot on mobile */}
      {isMobile && active && (
        <div style={{
          width: "8px", height: "8px", borderRadius: "50%",
          background: accentColor, flexShrink: 0,
          animation: "pulseGlow 1.2s ease-in-out infinite",
        }} />
      )}
    </div>
  </div>
);

// Horizontal animated arrow (desktop)
const HArrow = ({ color, delay, visible, id }) => (
  <div style={{
    opacity: visible ? 1 : 0,
    transition: `opacity 0.4s ease ${delay}s`,
    flexShrink: 0, display: "flex", alignItems: "center",
  }}>
    <svg width="28" height="14" viewBox="0 0 28 14" fill="none" overflow="visible">
      <defs>
        <linearGradient id={`hlg-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </linearGradient>
      </defs>
      <line x1="2" y1="7" x2="22" y2="7" stroke={`url(#hlg-${id})`} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 4L24 7L19 10" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle fill={color} r="2.5" opacity="0.9">
        <animateMotion dur="1.4s" repeatCount="indefinite" begin={`${delay * 0.4}s`} path="M2,7 L22,7" />
      </circle>
    </svg>
  </div>
);

// Vertical animated arrow (mobile)
const VArrow = ({ color, delay, visible, id }) => (
  <div style={{
    opacity: visible ? 1 : 0,
    transition: `opacity 0.4s ease ${delay}s`,
    display: "flex", justifyContent: "flex-start",
    paddingLeft: "19px",
    height: "28px",
  }}>
    <svg width="14" height="28" viewBox="0 0 14 28" fill="none" overflow="visible">
      <defs>
        <linearGradient id={`vlg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </linearGradient>
      </defs>
      <line x1="7" y1="2" x2="7" y2="22" stroke={`url(#vlg-${id})`} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 19L7 24L10 19" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle fill={color} r="2.5" opacity="0.9">
        <animateMotion dur="1.4s" repeatCount="indefinite" begin={`${delay * 0.4}s`} path="M7,2 L7,22" />
      </circle>
    </svg>
  </div>
);

// ─────────────────────────────────────────────────────────────
// AUTOMATION PIPELINE — fully responsive
// ─────────────────────────────────────────────────────────────
const AutomationPipelineSection = () => {
  const [sectionRef, sectionVisible] = useScrollReveal(0.1);
  const [activeNode, setActiveNode] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionVisible) return;
    const timer = setInterval(() => {
      setActiveNode(n => (n + 1) % (PIPELINE_1.length + PIPELINE_2.length));
    }, 900);
    return () => clearInterval(timer);
  }, [sectionVisible]);

  const renderPipeline = (nodes, accentColor, baseDelay, pipelineOffset) => {
    if (isMobile) {
      // Mobile: vertical stack
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {nodes.map((node, i) => (
            <React.Fragment key={i}>
              <AnimatedPipelineNode
                {...node}
                accentColor={accentColor}
                delay={baseDelay + i * 0.1}
                visible={sectionVisible}
                active={activeNode === pipelineOffset + i}
                isMobile={true}
              />
              {i < nodes.length - 1 && (
                <VArrow
                  color={accentColor}
                  delay={baseDelay + i * 0.1 + 0.05}
                  visible={sectionVisible}
                  id={`v-${pipelineOffset}-${i}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      );
    }

    // Desktop: horizontal row
    return (
      <div style={{ display: "flex", flexWrap: "nowrap", gap: "6px", alignItems: "center", overflowX: "auto", paddingBottom: "4px" }}>
        {nodes.map((node, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <HArrow
                color={accentColor}
                delay={baseDelay + i * 0.1}
                visible={sectionVisible}
                id={`h-${pipelineOffset}-${i}`}
              />
            )}
            <AnimatedPipelineNode
              {...node}
              accentColor={accentColor}
              delay={baseDelay + i * 0.1}
              visible={sectionVisible}
              active={activeNode === pipelineOffset + i}
              isMobile={false}
            />
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div
      ref={sectionRef}
      style={{
        position: "relative", overflow: "hidden",
        background: C.inkLight,
        borderRadius: "22px",
        padding: isMobile ? "24px 18px 28px" : "36px 32px 34px",
        boxShadow: `0 4px 32px rgba(0,0,0,0.18), 0 0 0 1px ${C.violet}20`,
      }}
    >
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "22px",
        backgroundImage: `linear-gradient(${C.violetGlow} 1px, transparent 1px), linear-gradient(90deg, ${C.violetGlow} 1px, transparent 1px)`,
        backgroundSize: "32px 32px", opacity: 0.4, pointerEvents: "none",
      }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: "180px", height: "180px", background: `radial-gradient(circle, ${C.violetGlow} 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "130px", height: "130px", background: `radial-gradient(circle, ${C.azureGlow} 0%, transparent 70%)`, pointerEvents: "none" }} />

      {/* Header */}
      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", alignItems: "center", gap: "12px",
        marginBottom: "28px",
        flexWrap: "wrap",
        opacity: sectionVisible ? 1 : 0,
        transform: sectionVisible ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0,
          background: `linear-gradient(135deg, ${C.violet}, ${C.violetLight})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 4px 16px ${C.violetGlow}`,
          animation: sectionVisible ? "pulseGlow 2.5s ease-in-out infinite" : "none",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: "0.55rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: `${C.violetLight}90`, marginBottom: "1px" }}>Make.com · No-code</p>
          <h3 style={{ fontSize: isMobile ? "1rem" : "1.15rem", fontWeight: 900, color: C.white, letterSpacing: "-0.02em" }}>Automation Pipeline</h3>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: "6px", flexShrink: 0,
          background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)",
          borderRadius: "999px", padding: "4px 12px",
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulseGlow 1.5s ease-in-out infinite" }} />
          <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#4ade80" }}>Live</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Trigger 1 */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "7px",
          background: `${C.violet}20`, border: `1px solid ${C.violet}40`,
          borderRadius: "8px", padding: "4px 12px", marginBottom: "14px",
          opacity: sectionVisible ? 1 : 0, transition: "opacity 0.4s ease 0.15s",
          maxWidth: "100%",
        }}>
          <span style={{ fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: C.violetLight, whiteSpace: "nowrap" }}>
            ⚡ Trigger — On message received
          </span>
        </div>

        <div style={{ marginBottom: "28px" }}>
          {renderPipeline(PIPELINE_1, C.violetLight, 0.2, 0)}
        </div>

        {/* Divider */}
        <div style={{
          height: "1px", marginBottom: "22px",
          background: `linear-gradient(90deg, transparent, ${C.violet}40, transparent)`,
          opacity: sectionVisible ? 1 : 0, transition: "opacity 0.4s ease 0.55s",
        }} />

        {/* Trigger 2 */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "7px",
          background: `${C.azure}20`, border: `1px solid ${C.azure}40`,
          borderRadius: "8px", padding: "4px 12px", marginBottom: "14px",
          opacity: sectionVisible ? 1 : 0, transition: "opacity 0.4s ease 0.6s",
          maxWidth: "100%",
        }}>
          <span style={{ fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: C.azureLight, whiteSpace: "nowrap" }}>
            🕕 Scheduled — Daily at 6:00 AM
          </span>
        </div>

        {renderPipeline(PIPELINE_2, C.azureLight, 0.65, PIPELINE_1.length)}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// PROJECT 01 — Daily Expense Tracker
// ─────────────────────────────────────────────────────────────
const DailyExpenseTracker = () => {

  return (
    <section
      id="project-expense"
      style={{
        background: C.white, padding: "80px 24px 100px",
        borderBottom: `1px solid ${C.border}`, position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", left: 0, top: "80px", bottom: "100px",
        width: "4px",
        background: `linear-gradient(180deg, ${C.violet}, ${C.violetLight}, #c4b5fd)`,
        borderRadius: "0 4px 4px 0",
      }} />
      <div style={{
        position: "absolute", top: 0, right: 0, width: "40%", height: "300px",
        background: `radial-gradient(ellipse at top right, ${C.violetGlow} 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ marginBottom: "52px" }}>
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
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              Live &amp; Running
            </span>
          </div>

          <h2 style={{
            fontSize: "clamp(1.9rem, 4.5vw, 3rem)",
            fontWeight: 900, color: C.inkLight,
            letterSpacing: "-0.03em", lineHeight: 1.1,
            marginBottom: "6px", fontFamily: "'Georgia', serif",
          }}>
            Daily Expense
          </h2>
          <h2 style={{
            fontSize: "clamp(1.9rem, 4.5vw, 3rem)",
            fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1,
            marginBottom: "22px", fontFamily: "'Georgia', serif",
            background: `linear-gradient(135deg, ${C.violet}, ${C.violetLight})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Tracker
          </h2>

          <p style={{ color: C.slate, fontSize: "1rem", lineHeight: 1.8, maxWidth: "560px", marginBottom: "28px" }}>
            A fully automated personal finance pipeline — text an expense to a Telegram bot,
            watch it appear in Google Sheets instantly, and receive a clean daily email summary
            every morning. Built on Make.com's free tier with zero code written.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {TAGS_EXPENSE.map((t) => (
              <span
                key={t.label}
                style={{
                  fontSize: "0.7rem", fontWeight: 700,
                  padding: "5px 14px", borderRadius: "999px",
                  color: t.color, background: t.bg,
                  border: `1px solid ${t.color}28`, cursor: "default",
                }}
              >{t.label}</span>
            ))}
          </div>
        </div>

        <ScreenshotGallery accentColor={C.violet} />
        <VideoPlayer accentColor={C.violet} />

        {/* ── KEY FEATURES — animated redesign ── */}
        <KeyFeaturesSection />

        {/* ── AUTOMATION PIPELINE — animated redesign ── */}
        <AutomationPipelineSection />
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// PROJECT 02 — Customer Analytics
// ─────────────────────────────────────────────────────────────
const CustomerAnalytics = () => {
  const ANALYTICS_FEATURES = [
    { icon: "🧠", title: "Customer Segmentation", desc: "K-means clustering to identify distinct customer groups and behavioral patterns." },
    { icon: "💬", title: "Sentiment Analysis",     desc: "NLP-powered review analysis to extract positive, neutral, and negative signals." },
    { icon: "📈", title: "Actionable Insights",    desc: "Visual dashboards translating raw data into clear business recommendations." },
    { icon: "🔬", title: "Data Science Stack",     desc: "Built with Python, Pandas, Scikit-learn, and Matplotlib for end-to-end analysis." },
  ];

  return (
    <section
      id="project-analytics"
      style={{ background: C.white, padding: "80px 24px 100px", position: "relative", overflow: "hidden" }}
    >
      <div style={{
        position: "absolute", left: 0, top: "80px", bottom: "100px", width: "4px",
        background: `linear-gradient(180deg, ${C.azure}, ${C.azureLight}, #93c5fd)`,
        borderRadius: "0 4px 4px 0",
      }} />
      <div style={{
        position: "absolute", top: 0, right: 0, width: "40%", height: "300px",
        background: `radial-gradient(ellipse at top right, ${C.azureGlow} 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <div style={{ marginBottom: "52px" }}>
          <ProjectBadge number="02" total="02" color={C.azure} />

          <div style={{ marginBottom: "20px" }}>
            <span style={{
              fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase",
              color: C.azure, background: C.azurePale, border: `1px solid ${C.azure}30`,
              borderRadius: "999px", padding: "5px 16px",
            }}>Data Analytics</span>
          </div>

          <h2 style={{
            fontSize: "clamp(1.9rem, 4.5vw, 3rem)", fontWeight: 900, color: C.inkLight,
            letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "6px", fontFamily: "'Georgia', serif",
          }}>
            Customer Segmentation
          </h2>
          <h2 style={{
            fontSize: "clamp(1.9rem, 4.5vw, 3rem)", fontWeight: 900,
            letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "22px", fontFamily: "'Georgia', serif",
            background: `linear-gradient(135deg, ${C.azure}, ${C.azureLight})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            &amp; Review Sentiment
          </h2>

          <p style={{ color: C.slate, fontSize: "1rem", lineHeight: 1.8, maxWidth: "520px", marginBottom: "36px" }}>
            Analyzes customer segments and review sentiments to uncover actionable business insights
            using data science techniques — from raw data to clear visual dashboards.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "40px" }}>
            {[
              { label: "Python",       color: "#1d4ed8", bg: "#eff6ff" },
              { label: "Pandas",       color: "#15803d", bg: "#dcfce7" },
              { label: "Scikit-learn", color: "#b91c1c", bg: "#fee2e2" },
              { label: "Matplotlib",   color: "#92400e", bg: "#fef3c7" },
              { label: "NLP",          color: "#6d28d9", bg: "#ede9fe" },
            ].map((t) => (
              <span key={t.label} style={{
                fontSize: "0.7rem", fontWeight: 700, padding: "5px 14px", borderRadius: "999px",
                color: t.color, background: t.bg, border: `1px solid ${t.color}28`, cursor: "default",
              }}>{t.label}</span>
            ))}
          </div>

          <SectionLabel>What it does</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(195px, 1fr))", gap: "14px", marginBottom: "48px" }}>
            {ANALYTICS_FEATURES.map((f, i) => (
              <div
                key={i}
                style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "14px", padding: "22px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", transition: "all 0.22s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${C.azureLight}40`; e.currentTarget.style.background = C.azureGlow; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.surface; }}
              >
                <span style={{ fontSize: "1.7rem", display: "block", marginBottom: "12px" }}>{f.icon}</span>
                <h3 style={{ fontSize: "0.87rem", fontWeight: 800, color: C.inkLight, marginBottom: "7px" }}>{f.title}</h3>
                <p style={{ fontSize: "0.76rem", color: C.muted, lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ background: `linear-gradient(135deg, ${C.inkLight} 0%, #1e3a5f 100%)`, borderRadius: "18px", padding: "36px 32px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.azureGlow} 1px, transparent 1px), linear-gradient(90deg, ${C.azureGlow} 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />
            <div style={{ position: "absolute", top: 0, right: 0, width: "200px", height: "200px", background: `radial-gradient(circle, ${C.azureGlow} 0%, transparent 70%)` }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ fontSize: "1.6rem" }}>📱</span>
                <span style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.16em", color: C.azureLight, textTransform: "uppercase", background: `${C.azureLight}18`, border: `1px solid ${C.azureLight}40`, borderRadius: "999px", padding: "4px 12px" }}>Mobile App</span>
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: C.white, marginBottom: "8px" }}>Download the Android Build</h3>
              <p style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.65, marginBottom: "22px" }}>
                Explore the analytics live on your Android device via Firebase App Distribution.
              </p>
              <button
                style={{ padding: "13px 28px", background: `linear-gradient(135deg, ${C.azure}, ${C.azureLight})`, color: C.white, fontWeight: 700, borderRadius: "12px", border: "none", cursor: "pointer", fontSize: "0.88rem", boxShadow: `0 4px 18px ${C.azureGlow}`, display: "inline-flex", alignItems: "center", gap: "9px" }}
                onClick={() => window.open("https://appdistribution.firebase.google.com/testerapps/1:195095990413:android:ab80021ee87e6ea70a92c4/releases/3ju5r5sfigrbg?utm_source=firebase-console", "_blank")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download Latest Build
              </button>
              <p style={{ marginTop: "12px", fontSize: "0.74rem", color: "#64748b" }}>📌 Mobile only — link won't open on desktop.</p>
            </div>
          </div>
        </div>
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
      @keyframes floatBlob1 { 0%, 100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-18px) scale(1.04); } }
      @keyframes floatBlob2 { 0%, 100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(14px) scale(0.97); } }
      @keyframes bounceArrow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
      @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes ringPulse { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.06); } }
      @keyframes pulseGlow { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
      ::-webkit-scrollbar { width: 6px; height: 6px; }
      ::-webkit-scrollbar-track { background: #f8fafc; }
      ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 999px; }
      ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      .header-pill:hover { transform: scale(1.07) translateY(-2px); transition: transform 0.18s ease; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
};

// ─────────────────────────────────────────────────────────────
// ROOT EXPORT
// ─────────────────────────────────────────────────────────────
const MiniProjectHeader = () => {
  return (
    <div>
      <GlobalStyles />
      <ProjectsSectionHeader />
      <DailyExpenseTracker />
      <SectionDivider label="Next Project" />
      <CustomerAnalytics />
    </div>
  );
};

export default MiniProjectHeader;