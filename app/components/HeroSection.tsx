"use client";

import { useEffect, useState } from "react";

const words = ["music", "culture", "community", "coming soon"];
const typingDelay = 90;
const deletingDelay = 55;
const holdDelay = 1100;
const nextWordDelay = 250;

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(words[0].length);
  const [isDeleting, setIsDeleting] = useState(true);

  const typedWord = words[wordIndex].slice(0, letterIndex);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const word = words[wordIndex];
    let delay = isDeleting ? deletingDelay : typingDelay;
    if (!isDeleting && letterIndex === word.length) delay = holdDelay;
    else if (isDeleting && letterIndex === 0) delay = nextWordDelay;
    const timeout = window.setTimeout(() => {
      if (!isDeleting && letterIndex === word.length) { setIsDeleting(true); return; }
      if (isDeleting && letterIndex === 0) { setIsDeleting(false); setWordIndex((i) => (i + 1) % words.length); return; }
      setLetterIndex((i) => i + (isDeleting ? -1 : 1));
    }, delay);
    return () => window.clearTimeout(timeout);
  }, [isDeleting, letterIndex, wordIndex]);

  return (
    <section id="home" style={{ position: "relative", display: "grid", placeItems: "center", minHeight: "100dvh", padding: 24, background: "#070707", scrollSnapAlign: "start", isolation: "isolate", overflow: "hidden" }} aria-label="yolobun studios landing page">
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.48,
          backgroundImage: [
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 7px)",
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.013) 0 1px, transparent 1px 9px)",
            "repeating-linear-gradient(27deg, rgba(255,255,255,0.01) 0 1px, transparent 1px 11px)",
          ].join(", "),
          backgroundSize: "11px 11px, 13px 13px, 17px 17px",
          mixBlendMode: "soft-light",
        }}
      />
      <div style={{ display: "grid", placeItems: "center", gap: 18, textAlign: "center", transform: "translateY(-1vh)" }}>
        <h1
          className="hero-wordmark"
          aria-label="yolobun studios"
          style={{
            display: "grid",
            gap: "clamp(12px, 1.8vw, 24px)",
            margin: 0,
            color: "rgba(232,228,220,0.9)",
            fontFamily: "\"Arial Narrow\", \"HelveticaNeue-CondensedBold\", \"Helvetica Neue Condensed Bold\", \"Roboto Condensed\", Impact, sans-serif",
            fontSize: "clamp(60px, 11vw, 168px)",
            fontStretch: "condensed",
            fontWeight: 800,
            letterSpacing: "0.14em",
            lineHeight: 0.86,
            textRendering: "geometricPrecision",
            textShadow: "0 1px 0 rgba(255,255,255,0.05), 0 18px 42px rgba(0,0,0,0.45)",
          }}
        >
          <span style={{ display: "block", transform: "scaleX(0.78)" }}>YOLOBUN</span>
          <span style={{ display: "block", transform: "scaleX(0.78)" }}>STUDIOS</span>
        </h1>
        <p style={{ margin: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "1.3em", minWidth: "10ch", fontSize: "clamp(18px, 3vw, 34px)", fontWeight: 400, lineHeight: 1.3, color: "rgba(232,228,220,0.62)" }} aria-label="yolobun is music, culture, community, coming soon">
          <span>{typedWord}</span>
          <span style={{ marginLeft: 5, display: "inline-block", width: 2, height: "1em", background: "currentColor", animation: "blink 900ms steps(1) infinite" }} aria-hidden="true" />
        </p>
      </div>
    </section>
  );
}
