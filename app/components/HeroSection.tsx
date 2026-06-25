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
    <section id="home" style={{ position: "relative", display: "grid", placeItems: "center", minHeight: "100dvh", padding: 24, scrollSnapAlign: "start" }} aria-label="yolobun landing page">
      <div style={{ display: "grid", placeItems: "center", gap: 14, textAlign: "center", transform: "translateY(-1vh)" }}>
        <h1 style={{ margin: 0, fontSize: "clamp(56px, 11vw, 144px)", fontWeight: 500, lineHeight: 0.9, letterSpacing: "-0.02em", fontFamily: "var(--font-dm-sans)" }}>YOLOBUN</h1>
        <p style={{ margin: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "1.3em", minWidth: "10ch", fontSize: "clamp(18px, 3vw, 34px)", fontWeight: 400, lineHeight: 1.3, color: "rgba(255,255,255,0.7)" }} aria-label="yolobun is music, culture, community, coming soon">
          <span>{typedWord}</span>
          <span style={{ marginLeft: 5, display: "inline-block", width: 2, height: "1em", background: "currentColor", animation: "blink 900ms steps(1) infinite" }} aria-hidden="true" />
        </p>
      </div>
    </section>
  );
}
