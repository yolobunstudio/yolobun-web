"use client";

import { useRef, useCallback } from "react";

type Props = {
  goTo: (id: string) => void;
  onStoreOpen: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

export default function FlashlightNav({ goTo, onStoreOpen, containerRef }: Props) {
  const navTextRef = useRef<HTMLDivElement>(null);
  const navGlowRef = useRef<HTMLDivElement>(null);

  const navLeave = useCallback(() => {
    if (navGlowRef.current) navGlowRef.current.style.opacity = "0";
    if (navTextRef.current) navTextRef.current.style.opacity = "0";
  }, []);

  const navMove = useCallback((e: React.MouseEvent) => {
    if (window.innerWidth < 960) return;
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
  }, [navLeave, containerRef]);

  return (
    <nav
      className="flashlight-nav"
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
        <a onClick={onStoreOpen} style={{ color: "#fff", fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", textDecoration: "none" }}>store</a>
      </div>
    </nav>
  );
}
