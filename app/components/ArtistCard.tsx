import Image from "next/image";
import type { Artist } from "../data/artists";
import { platformIcons } from "./icons";

type ArtistCardProps = {
  artist: Artist;
  index: number;
  onSelect: () => void;
  onMotionComplete?: () => void;
};

export default function ArtistCard({ artist, index, onSelect, onMotionComplete }: ArtistCardProps) {
  const previewLinks = artist.links.filter((link) => link.preview);

  return (
    <div
      className="roster-card-motion"
      style={{ "--card-index": index } as React.CSSProperties}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) onMotionComplete?.();
      }}
    >
      <article className="roster-card">
        <button className="roster-card__trigger" type="button" onClick={onSelect} aria-label={`View ${artist.name}`} />
        <div style={{ flex: "1 1 0", minHeight: 0, position: "relative", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          {artist.image ? (
            <Image src={artist.image.src} alt={`${artist.name} photo`} fill sizes="(min-width: 960px) 300px, 82vw" style={{ objectFit: "cover", objectPosition: artist.image.position }} draggable={false} />
          ) : (
            <div style={{ color: "rgba(255,255,255,0.1)", fontSize: 72, fontWeight: 700 }}>{artist.name.slice(0, 1).toUpperCase()}</div>
          )}
        </div>
        <div style={{ padding: 24, flexShrink: 0, display: "flex", flexDirection: "column", minHeight: 170 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>{artist.name}</h3>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{artist.role}</span>
          </div>
          <p style={{ margin: "0 0 16px", fontSize: 14, lineHeight: 1.5, color: "rgba(255,255,255,0.5)", minHeight: "21px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{artist.bio}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "nowrap", minHeight: "20px", overflow: "hidden" }}>
            {artist.tags.map((tag) => <span key={tag} style={{ padding: "2px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", fontSize: 11, color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}>{tag}</span>)}
          </div>
          <div style={{ marginTop: "auto", paddingTop: 12, display: "flex", gap: 14, minHeight: 16 }}>
            {previewLinks.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noreferrer" aria-label={`${artist.name} ${link.title}`} className="roster-card__link">
                {platformIcons[link.platform] ?? link.platform}
              </a>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
