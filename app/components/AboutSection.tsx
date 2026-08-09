import { InstagramIcon, TikTokIcon } from "./icons";

export default function AboutSection() {
  return (
    <section id="about" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100dvh", padding: "80px 24px", background: "#070707", scrollSnapAlign: "start", isolation: "isolate", overflow: "hidden" }} aria-label="about">
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
      <div style={{ maxWidth: 512, textAlign: "center" }}>
        <h2 style={{ margin: "0 0 32px", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>About</h2>
        <p style={{ margin: "0 0 32px", fontSize: "clamp(22px, 4vw, 40px)", fontWeight: 500, lineHeight: 1.2 }}>yolobun is a creative collective built on music, community, and culture.</p>
        <p style={{ margin: "0 0 16px", fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.5)" }}>a home for artists figuring it out together.<br />releases, shows, made by the people in the room.</p>
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
  );
}
