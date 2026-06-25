import { artists } from "../data/artists";
import ArtistCard from "./ArtistCard";

export default function TeamSection() {
  return (
    <section id="team" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100dvh", padding: "80px 0", background: "#0a0a0a", scrollSnapAlign: "start" }} aria-label="artists">
      <h2 style={{ margin: "0 0 48px", padding: "0 24px", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>team</h2>
      <div className="roster-grid">
        {artists.map((artist) => (
          <ArtistCard key={artist.name} artist={artist} />
        ))}
      </div>
    </section>
  );
}
