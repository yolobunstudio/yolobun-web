import { InstagramIcon, TikTokIcon } from "./icons";

export default function AboutSection() {
  return (
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
  );
}
