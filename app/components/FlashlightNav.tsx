"use client";

import { useRef, useCallback, useEffect } from "react";

type Props = {
  goTo: (id: string) => void;
  onStoreOpen: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

export default function FlashlightNav({ goTo, onStoreOpen, containerRef }: Props) {
  const navTextRef = useRef<HTMLDivElement>(null);
  const navGlowRef = useRef<HTMLDivElement>(null);
  const lastPointerRef = useRef({ x: typeof window === "undefined" ? 0 : window.innerWidth / 2, y: 36 });

  const navLeave = useCallback(() => {
    if (navGlowRef.current) navGlowRef.current.style.opacity = "0";
    if (navTextRef.current) navTextRef.current.style.opacity = "0";
  }, []);

  const updateFlashlight = useCallback((clientX: number, clientY: number) => {
    if (window.innerWidth < 960) return;
    const c = containerRef.current;
    const hero = c?.querySelector("#home") as HTMLElement | null;
    if (!hero) return;
    const r = hero.getBoundingClientRect();
    if (clientY < r.top || clientY > r.bottom) { navLeave(); return; }
    let p = (clientY - r.top) / Math.max(1, r.bottom - r.top);
    p = Math.min(1, Math.max(0, p));
    const fade = Math.max(0, 1 - p * 1.45);

    const g = navGlowRef.current;
    if (g) {
      const gr = g.getBoundingClientRect();
      const gx = clientX - gr.left, gy = clientY - gr.top;
      if (fade <= 0.02) {
        g.style.opacity = "0";
        g.style.background = "transparent";
        return;
      }
      g.style.opacity = String(Math.min(0.82, fade * 0.82));
      const coreRadius = 58 + 46 * fade;
      const bloomRadius = 118 + 72 * fade;
      const spillRadius = 190 + 84 * fade;
      const core = 0.035 * fade;
      const bloom = 0.028 * fade;
      const spill = 0.018 * fade;
      g.style.background = [
        `radial-gradient(circle ${coreRadius}px at ${gx}px ${gy}px, rgba(255,255,255,${core}) 0%, rgba(255,255,255,${core * 0.72}) 34%, rgba(255,255,255,0) 78%)`,
        `radial-gradient(circle ${bloomRadius}px at ${gx}px ${gy}px, rgba(255,255,255,${bloom}) 0%, rgba(255,255,255,${bloom * 0.42}) 42%, rgba(255,255,255,0) 82%)`,
        `radial-gradient(circle ${spillRadius}px at ${gx}px ${gy}px, rgba(255,255,255,${spill}) 0%, rgba(255,255,255,${spill * 0.22}) 48%, rgba(255,255,255,0) 88%)`,
      ].join(", ");
    }
    const t = navTextRef.current;
    if (t) {
      const tr = t.getBoundingClientRect();
      const tx = clientX - tr.left, ty = clientY - tr.top;
      t.style.opacity = String(fade);
      const radius = Math.max(14, 54 * fade);
      const m = `radial-gradient(circle ${radius}px at ${tx}px ${ty}px, #000 0%, rgba(0,0,0,0.9) 38%, transparent 82%)`;
      t.style.webkitMaskImage = m;
      (t.style as unknown as Record<string, string>).maskImage = m;
    }
  }, [navLeave, containerRef]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      updateFlashlight(event.clientX, event.clientY);
    };
    const onScroll = () => {
      updateFlashlight(lastPointerRef.current.x, lastPointerRef.current.y);
    };
    const onPointerLeave = () => navLeave();

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);
    const container = containerRef.current;
    container?.addEventListener("scroll", onScroll, { passive: true });
    updateFlashlight(lastPointerRef.current.x, lastPointerRef.current.y);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      container?.removeEventListener("scroll", onScroll);
    };
  }, [containerRef, navLeave, updateFlashlight]);

  return (
    <nav
      className="flashlight-nav"
      onMouseLeave={navLeave}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, height: "100dvh",
        zIndex: 100, background: "transparent", pointerEvents: "none",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        paddingTop: 22, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      <div ref={navGlowRef} style={{ position: "absolute", inset: 0, opacity: 0, transition: "opacity 180ms", pointerEvents: "none", mixBlendMode: "screen" }} />
      <div ref={navTextRef} style={{ position: "relative", display: "flex", gap: 44, opacity: 0, transition: "opacity 220ms", pointerEvents: "auto" }}>
        {(["home", "about", "team"] as const).map((id) => (
          <a key={id} onClick={() => goTo(id)} style={{ color: "#fff", fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", textDecoration: "none" }}>{id}</a>
        ))}
        <a onClick={onStoreOpen} style={{ color: "#fff", fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", textDecoration: "none" }}>store</a>
      </div>
    </nav>
  );
}
