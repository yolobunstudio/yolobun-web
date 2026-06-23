"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import yolobunPortrait from "./media/henwoo niteharts2.jpg";
import nianPortrait from "./media/nian.jpg";

const words = ["creative", "community", "music", "idek", "vibes", "coming soon"];
const typingDelay = 90;
const deletingDelay = 55;
const holdDelay = 1100;
const nextWordDelay = 250;

const artists = [
  {
    name: "yolobun",
    role: "founder sorta / producer",
    tags: ["dubstep", "bass house", "trap"],
    bio: "let's have some fun lolol",
    links: [{ label: "SoundCloud", url: "https://soundcloud.com/yolobunmusic" }],
    image: true,
  },
  {
    name: "nian",
    role: "artist / producer",
    tags: ["indie pop", "bedroom pop", "alt r&b"],
    bio: "maybe your next lowkey niche artist",
    links: [
      { label: "SoundCloud", url: "https://soundcloud.com/nian_la" },
      { label: "Spotify", url: "https://open.spotify.com/artist/3cBfn66CziFcst8xoHF9ZC" },
      { label: "Instagram", url: "https://www.instagram.com/nian.la/" },
      { label: "TikTok", url: "https://www.tiktok.com/@itsnotgordon" },
    ],
    image: true,
  },
  {
    name: "artist 03",
    role: "artist",
    tags: [],
    bio: "coming soon",
    links: [],
    image: false,
  },
];

const STORE_PASSWORD = "yolobun";

// SVG icons
function SoundCloudIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.175 12.225c-.015.132.07.248.2.263l.44.044c.132.015.248-.07.263-.2l.37-3.51-.37-3.48c-.015-.132-.13-.215-.263-.2l-.44.044c-.13.015-.215.13-.2.263zm1.655-.557c-.015.132.07.248.2.263l.44.044c.132.015.248-.07.263-.2l.295-3.182-.295-3.14c-.015-.132-.13-.215-.263-.2l-.44.044c-.13.015-.215.13-.2.263zm1.655.277c-.015.132.07.248.2.263l.44.044c.132.015.248-.07.263-.2l.22-2.905-.22-2.848c-.015-.132-.13-.215-.263-.2l-.44.044c-.13.015-.215.13-.2.263zm1.655-.52c-.015.132.07.248.2.263l.44.044c.132.015.248-.07.263-.2l.145-2.385-.145-2.315c-.015-.132-.13-.215-.263-.2l-.44.044c-.13.015-.215.13-.2.263zM8.8 8.84c-.044 0-.088.015-.125.04-.22-2.56-2.35-4.56-4.965-4.56-1.375 0-2.615.535-3.525 1.4v8.56c0 .44.357.8.8.8h7.815c.44 0 .8-.36.8-.8V9.64c0-.44-.36-.8-.8-.8zm4.8.96c-.308 0-.6.07-.862.19C12.48 7.43 10.46 5.6 8.035 5.6c-.22 0-.44.015-.655.044v9.715h12.02c1.435 0 2.6-1.165 2.6-2.6s-1.165-2.6-2.6-2.6c-.19 0-.375.022-.55.06-.19-1.32-1.325-2.34-2.65-2.34-.058 0-.115.002-.172.006A4.038 4.038 0 0 0 13.6 9.8z"/>
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
    </svg>
  );
}

const platformIcons: Record<string, React.ReactNode> = {
  SoundCloud: <SoundCloudIcon />,
  Spotify: <SpotifyIcon />,
  Instagram: <InstagramIcon />,
  TikTok: <TikTokIcon />,
};

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(words[0].length);
  const [isDeleting, setIsDeleting] = useState(true);
  const [storeOpen, setStoreOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);

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

  const navLeave = useCallback(() => {
    if (navGlowRef.current) navGlowRef.current.style.opacity = "0";
    if (navTextRef.current) navTextRef.current.style.opacity = "0";
  }, []);

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
  }, [navLeave]);

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
        </section>

        {/* Team */}
        <section id="team" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100dvh", padding: "80px 24px", background: "#0a0a0a", scrollSnapAlign: "start" }} aria-label="artists">
          <h2 style={{ margin: "0 0 48px", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>team</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, width: "100%", maxWidth: 900 }}>
            {artists.map((artist) => (
              <div key={artist.name} style={{ aspectRatio: "3/4", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", background: "#111", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ flex: "1 1 0", minHeight: 0, background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  {artist.image ? (
                    <Image src={artist.name === "nian" ? nianPortrait : yolobunPortrait} alt={`${artist.name} photo`} style={{ height: "100%", width: "100%", objectFit: "cover", objectPosition: artist.name === "yolobun" ? "center 5%" : "center top" }} draggable={false} priority />
                  ) : (
                    <div style={{ color: "rgba(255,255,255,0.1)", fontSize: 72, fontWeight: 700 }}>{artist.name.slice(0, 1).toUpperCase()}</div>
                  )}
                </div>
                <div style={{ padding: 24, flexShrink: 0, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
                    <h3 style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>{artist.name}</h3>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{artist.role}</span>
                  </div>
                  <p style={{ margin: "0 0 16px", fontSize: 14, lineHeight: 1.5, color: "rgba(255,255,255,0.5)", minHeight: "21px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{artist.bio}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "nowrap", minHeight: "20px", overflow: "hidden" }}>
                    {artist.tags.map((tag) => (
                      <span key={tag} style={{ padding: "2px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{tag}</span>
                    ))}
                  </div>
                  {artist.links.length > 0 && (
                    <div style={{ marginTop: "auto", paddingTop: 12, display: "flex", gap: 14 }}>
                      {artist.links.map((link) => (
                        <a key={link.label} href={link.url} target="_blank" rel="noreferrer" aria-label={link.label} style={{ color: "rgba(255,255,255,0.4)", display: "flex", textDecoration: "none", transition: "color 200ms" }} onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
                          {platformIcons[link.label] ?? link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100dvh", padding: "80px 24px", background: "#000", scrollSnapAlign: "start" }} aria-label="about">
          <div style={{ maxWidth: 512, textAlign: "center" }}>
            <h2 style={{ margin: "0 0 32px", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>About</h2>
            <p style={{ margin: "0 0 32px", fontSize: "clamp(22px, 4vw, 40px)", fontWeight: 500, lineHeight: 1.2 }}>yolobun is a creative collective built on music, community, and culture.</p>
            <p style={{ margin: "0 0 16px", fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.5)" }}>a home for artists figuring it out together — releases, shows, and merch made by the people in the room.</p>
            <p style={{ margin: "0 0 40px", fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.3)" }}>more coming. for now, turn it up.</p>
            <div style={{ display: "flex", gap: 20, justifyContent: "center", alignItems: "center" }}>
              <a href="https://www.instagram.com/yolobunmusic" target="_blank" rel="noreferrer" aria-label="Instagram" style={{ color: "rgba(255,255,255,0.3)", display: "flex", textDecoration: "none", transition: "color 200ms" }} onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>
                <InstagramIcon />
              </a>
              <a href="https://www.tiktok.com/@yolobun" target="_blank" rel="noreferrer" aria-label="TikTok" style={{ color: "rgba(255,255,255,0.3)", display: "flex", textDecoration: "none", transition: "color 200ms" }} onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>
                <TikTokIcon />
              </a>
            </div>
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
