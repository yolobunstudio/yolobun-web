"use client";

import { useState, useRef, useCallback } from "react";
import HeroSection from "./components/HeroSection";
import TeamSection from "./components/TeamSection";
import AboutSection from "./components/AboutSection";
import StoreOverlay from "./components/StoreOverlay";
import FlashlightNav from "./components/FlashlightNav";
import MobileMenu from "./components/MobileMenu";

export default function Home() {
  const [storeOpen, setStoreOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((id: string) => {
    const c = containerRef.current;
    if (!c) return;
    const el = c.querySelector("#" + id) as HTMLElement | null;
    if (el) c.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  }, []);

  const goTo = useCallback((id: string) => {
    if (storeOpen) {
      setStoreOpen(false);
      requestAnimationFrame(() => scrollTo(id));
    } else {
      scrollTo(id);
    }
  }, [storeOpen, scrollTo]);

  return (
    <main style={{ position: "relative", height: "100dvh", overflow: "hidden" }}>
      <MobileMenu
        open={menuOpen}
        onToggle={() => setMenuOpen((o) => !o)}
        goTo={goTo}
        onStoreOpen={() => { setMenuOpen(false); setStoreOpen(true); }}
      />

      <FlashlightNav
        goTo={goTo}
        onStoreOpen={() => setStoreOpen(true)}
        containerRef={containerRef}
      />

      <div
        ref={containerRef}
        style={{
          position: "relative", height: "100dvh", overflowY: "scroll",
          scrollSnapType: "y proximity", scrollBehavior: "smooth",
          background: "#070707", color: "rgba(232,228,220,0.9)",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <HeroSection />
        <TeamSection />
        <AboutSection />
      </div>

      {storeOpen && <StoreOverlay onClose={() => setStoreOpen(false)} />}
    </main>
  );
}
