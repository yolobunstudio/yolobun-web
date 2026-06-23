"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import yolobunPortrait from "./media/henwoo niteharts.jpeg";

const words = ["creative", "community", "music", "idek", "vibes", "coming soon"];
const typingDelay = 90;
const deletingDelay = 55;
const holdDelay = 1100;
const nextWordDelay = 250;

const artists = [
  {
    name: "yolobun",
    role: "founder sorta / producer",
    tags: ["dubstep", "bass house", "trap", "melodic"],
    bio: "idk what i'ma do with this collective but let's have some fun lol",
    soundcloud: "https://soundcloud.com/yolobunmusic",
  },
  {
    name: "artist 02",
    role: "Coming Soon",
    tags: [],
    bio: "A new voice joining the roster. Stay tuned.",
  },
  {
    name: "artist 03",
    role: "Coming Soon",
    tags: [],
    bio: "Something's brewing. Watch this space.",
  },
];

const STORE_PASSWORD = "yolobun";

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(words[0].length);
  const [isDeleting, setIsDeleting] = useState(true);
  const [activeArtist, setActiveArtist] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);

  const dragStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const navTextRef = useRef<HTMLDivElement>(null);
  const navGlowRef = useRef<HTMLDivElement>(null);

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

  const prev = () => setActiveArtist((i) => (i - 1 + artists.length) % artists.length);
  const next = () => setActiveArtist((i) => (i + 1) % artists.length);

  const onDragStart = (x: number) => { setDragging(true); dragStartX.current = x; };
  const onDragEnd = (x: number) => {
    if (!dragging) return;
    setDragging(false);
    const delta = dragStartX.current - x;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
  };

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

  const navMove = useCallback((e: React.MouseEvent) => {
    const c = containerRef.current;
    const hero = c?.querySelector("#home") as HTMLElement | null;
    if (!hero) return;
    const r = hero.getBoundingClientRect();
    if (e.clientY < r.top || e.clientY > r.bottom) { navLeave(); return; }
    let p = (e.clientY - r.top) / Math.max(1, r.bottom - r.top);
    p = Math.min(1, Math.max(0, p));
    const fade = 1 - p;

    const g = navGlowRef.current;
    if (g) {
      const gr = g.getBoundingClientRect();
      const gx = e.clientX - gr.left, gy = e.clientY - gr.top;
      g.style.opacity = String(fade);
      const radius = 220 * fade;
      g.style.background = `radial-gradient(circle ${radius}px at ${gx}px ${gy}px, rgba(255,255,255,0.08), rgba(255,255,255,0) 72%)`;
    }
    const t = navTextRef.current;
    if (t) {
      const tr = t.getBoundingClientRect();
      const tx = e.clientX - tr.left, ty = e.clientY - tr.top;
      t.style.opacity = String(fade);
      const radius = Math.max(18, 95 * fade);
      const m = `radial-gradient(circle ${radius}px at ${tx}px ${ty}px, #000 0%, #000 45%, transparent 80%)`;
      t.style.webkitMaskImage = m;
      (t.style as unknown as Record<string, string>).maskImage = m;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navLeave = useCallback(() => {
    if (navGlowRef.current) navGlowRef.current.style.opacity = "0";
    if (navTextRef.current) navTextRef.current.style.opacity = "0";
  }, []);

  const submitPw = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwInput.trim().toLowerCase() === STORE_PASSWORD) {
      setUnlocked(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  return (
    <main style={{ position: "relative", height: "100dvh", overflow: "hidden" }}>
      {/* Flashlight navbar */}
      <nav
        onMouseMove={navMove}
        onMouseLeave={navLeave}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, height: "100dvh",
          zIndex: 100, background: "transparent", pointerEvents: "none",
          display: "flex", alignItems: "flex-start", justifyContent: "center",
          paddingTop: 22, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        <div ref={navGlowRef} style={{ position: "absolute", inset: 0, opacity: 0, transition: "opacity 220ms", pointerEvents: "none" }} />
        <div ref={navTextRef} style={{ position: "relative", display: "flex", gap: 44, opacity: 0, transition: "opacity 220ms", pointerEvents: "auto" }}>
          {(["home", "about", "team"] as const).map((id) => (
            <a key={id} onClick={() => goTo(id)} style={{ color: "#fff", fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", textDecoration: "none" }}>{id}</a>
          ))}
          <a onClick={() => setStoreOpen(true)} style={{ color: "#fff", fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", textDecoration: "none" }}>store</a>
        </div>
      </nav>

      {/* Scroll container */}
      <div
        ref={containerRef}
        onMouseMove={navMove}
        onMouseLeave={navLeave}
        style={{
          position: "relative", height: "100dvh", overflowY: "scroll",
          scrollSnapType: "y proximity", scrollBehavior: "smooth",
          background: "#000", color: "#fff",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {/* Hero */}
        <section id="home" style={{ position: "relative", display: "grid", placeItems: "center", minHeight: "100dvh", padding: 24, scrollSnapAlign: "start" }} aria-label="yolobun landing page">
          <div style={{ display: "grid", placeItems: "center", gap: 14, textAlign: "center", transform: "translateY(-1vh)" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(56px, 11vw, 144px)", fontWeight: 500, lineHeight: 0.9, letterSpacing: "-0.01em" }}>yolobun</h1>
            <p style={{ margin: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "1.3em", minWidth: "10ch", fontSize: "clamp(18px, 3vw, 34px)", fontWeight: 400, lineHeight: 1.3, color: "rgba(255,255,255,0.7)" }} aria-label="yolobun is creative, community, music, matcha, vibes, coming soon">
              <span>{typedWord}</span>
              <span style={{ marginLeft: 5, display: "inline-block", width: 2, height: "1em", background: "currentColor", animation: "blink 900ms steps(1) infinite" }} aria-hidden="true" />
            </p>
          </div>
          <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.3)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            <span>scroll</span>
            <span style={{ display: "block", width: 1, height: 24, background: "rgba(255,255,255,0.2)" }} />
          </div>
        </section>

        {/* Team */}
        <section id="team" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100dvh", padding: "80px 24px", background: "#0a0a0a", scrollSnapAlign: "start" }} aria-label="artists">
          <h2 style={{ margin: "0 0 48px", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>The Roster</h2>

          <div
            style={{ width: "100%", maxWidth: 384, userSelect: "none", cursor: "grab" }}
            onMouseDown={(e) => onDragStart(e.clientX)}
            onMouseUp={(e) => onDragEnd(e.clientX)}
            onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
            onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
          >
            <div style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", background: "#111", overflow: "hidden" }}>
              <div style={{ width: "100%", aspectRatio: "1", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {activeArtist === 0 ? (
                  <Image src={yolobunPortrait} alt="yolobun at a show" style={{ height: "100%", width: "100%", objectFit: "cover", objectPosition: "center" }} draggable={false} priority />
                ) : (
                  <div style={{ color: "rgba(255,255,255,0.1)", fontSize: 72, fontWeight: 700 }}>{artists[activeArtist].name.slice(0, 1).toUpperCase()}</div>
                )}
              </div>
              <div style={{ padding: 24, minHeight: 188 }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
                  <h3 style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>{artists[activeArtist].name}</h3>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{artists[activeArtist].role}</span>
                </div>
                <p style={{ margin: "0 0 16px", fontSize: 14, color: "rgba(255,255,255,0.5)" }}>{artists[activeArtist].bio}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {artists[activeArtist].tags.map((tag) => (
                    <span key={tag} style={{ padding: "2px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{tag}</span>
                  ))}
                </div>
                {artists[activeArtist].soundcloud && (
                  <a href={artists[activeArtist].soundcloud} target="_blank" rel="noreferrer" style={{ marginTop: 20, display: "inline-flex", fontSize: 11, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>SoundCloud ↗</a>
                )}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 24 }}>
            <button onClick={prev} style={{ height: 36, width: 36, borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.4)", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="previous artist">←</button>
            <div style={{ display: "flex", gap: 8 }}>
              {artists.map((_, i) => (
                <button key={i} onClick={() => setActiveArtist(i)} style={{ height: 6, borderRadius: 999, border: "none", cursor: "pointer", transition: "all 300ms", width: i === activeArtist ? 24 : 6, background: i === activeArtist ? "#fff" : "rgba(255,255,255,0.2)" }} aria-label={`go to artist ${i + 1}`} />
              ))}
            </div>
            <button onClick={next} style={{ height: 36, width: 36, borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.4)", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="next artist">→</button>
          </div>
        </section>

        {/* About */}
        <section id="about" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100dvh", padding: "80px 24px", background: "#000", scrollSnapAlign: "start" }} aria-label="about">
          <div style={{ maxWidth: 512, textAlign: "center" }}>
            <h2 style={{ margin: "0 0 32px", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>About</h2>
            <p style={{ margin: "0 0 32px", fontSize: "clamp(22px, 4vw, 40px)", fontWeight: 500, lineHeight: 1.2 }}>yolobun is a creative collective built on music, community, and culture.</p>
            <p style={{ margin: "0 0 16px", fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.5)" }}>a home for artists figuring it out together — releases, shows, and merch made by the people in the room.</p>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.3)" }}>more coming. for now, turn it up.</p>
          </div>
        </section>
      </div>

      {/* Store overlay */}
      {storeOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 90, background: "#000", color: "#fff", overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "96px 24px", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
          <button onClick={() => setStoreOpen(false)} style={{ position: "absolute", top: 18, left: 24, background: "transparent", border: "none", color: "rgba(255,255,255,0.45)", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>← back</button>
          <h2 style={{ margin: "0 0 40px", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>The Store</h2>

          {!unlocked ? (
            <div style={{ width: "100%", maxWidth: 380, textAlign: "center", animation: pwError ? "shake 400ms" : undefined }}>
              {/* Lock icon */}
              <div style={{ margin: "0 auto 28px", width: 56, position: "relative" }}>
                <div style={{ width: 34, height: 24, margin: "0 auto -2px", border: "3px solid rgba(255,255,255,0.35)", borderBottom: "none", borderRadius: "18px 18px 0 0" }} />
                <div style={{ width: 56, height: 46, borderRadius: 12, border: "1px solid rgba(255,255,255,0.2)", background: "#111", display: "grid", placeItems: "center" }}>
                  <div style={{ width: 6, height: 6, borderRadius: 999, background: "rgba(255,255,255,0.5)" }} />
                </div>
              </div>
              <p style={{ margin: "0 0 10px", fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 500, lineHeight: 1.1 }}>members only</p>
              <p style={{ margin: "0 0 28px", fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.45)" }}>merch drops are locked for now. got the password?</p>
              <form onSubmit={submitPw} style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                <input
                  type="password"
                  value={pwInput}
                  onChange={(e) => { setPwInput(e.target.value); setPwError(false); }}
                  placeholder="enter password"
                  autoComplete="off"
                  style={{ flex: 1, minWidth: 0, height: 46, padding: "0 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", background: "#0c0c0c", color: "#fff", fontSize: 14, fontFamily: "inherit", outline: "none" }}
                />
                <button type="submit" style={{ height: 46, padding: "0 22px", borderRadius: 10, border: "none", background: "#fff", color: "#000", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>unlock</button>
              </form>
              <p style={{ margin: "16px 0 0", minHeight: 18, fontSize: 12, color: pwError ? "rgba(255,120,120,0.9)" : "transparent" }}>nope — that&apos;s not it. try again.</p>
            </div>
          ) : (
            <div style={{ maxWidth: 420, textAlign: "center" }}>
              <p style={{ margin: "0 0 12px", fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 500, lineHeight: 1.1, color: "#fff" }}>you&apos;re in.</p>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.45)" }}>the shop is being built. first drop coming soon — you&apos;ll be the first to know.</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
