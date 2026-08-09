import Image from "next/image";
import type { Artist } from "../data/artists";
import { platformIcons } from "./icons";
import yolobunPortrait from "../media/yolobun.jpg";
import nianPortrait from "../media/nian.jpg";

export default function ArtistCard({
  artist,
  index,
  isActive,
  isRevealed,
  isReturning,
  onOpen,
}: {
  artist: Artist;
  index: number;
  isActive: boolean;
  isRevealed: boolean;
  isReturning: boolean;
  onOpen: (origin: DOMRect) => void;
}) {
  const previewLinks = artist.links.filter((link) => link.preview);

  return (
    <div
      className={`roster-card${isRevealed ? " roster-card--revealed" : ""}${isActive ? " roster-card--active" : ""}${isReturning ? " roster-card--returning" : ""}`}
      role="button"
      tabIndex={0}
      onClick={(event) => onOpen(event.currentTarget.getBoundingClientRect())}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(event.currentTarget.getBoundingClientRect());
        }
      }}
      style={{
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.1)",
        background: "#111",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        opacity: isActive ? 0 : isRevealed ? 1 : 0,
        pointerEvents: isActive ? "none" : "auto",
        transform: isRevealed ? undefined : "translateY(34px) scale(0.985)",
        transition: "opacity 620ms ease, border-color 180ms ease, transform 620ms cubic-bezier(0.2, 0.82, 0.16, 1)",
        animation: isReturning ? "roster-card-return 420ms cubic-bezier(0.2, 0.82, 0.16, 1)" : undefined,
        transitionDelay: `${index * 90}ms`,
      }}
    >
      <div style={{ flex: "1 1 0", minHeight: 0, position: "relative", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {artist.image ? (
          <Image
            src={artist.name === "nian" ? nianPortrait : yolobunPortrait}
            alt={`${artist.name} photo`}
            fill
            style={{ objectFit: "cover", objectPosition: artist.name === "yolobun" ? "center center" : "center top" }}
            draggable={false}
            priority
          />
        ) : (
          <div style={{ color: "rgba(255,255,255,0.1)", fontSize: 72, fontWeight: 700 }}>
            {artist.name.slice(0, 1).toUpperCase()}
          </div>
        )}
      </div>
      <div style={{ padding: 24, flexShrink: 0, display: "flex", flexDirection: "column", minHeight: 170 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>{artist.name}</h3>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{artist.role}</span>
        </div>
        <p style={{ margin: "0 0 16px", fontSize: 14, lineHeight: 1.5, color: "rgba(255,255,255,0.5)", minHeight: "21px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {artist.bio}
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "nowrap", minHeight: "20px", overflow: "hidden" }}>
          {artist.tags.map((tag) => (
            <span key={tag} style={{ padding: "2px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", fontSize: 11, color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}>
              {tag}
            </span>
          ))}
        </div>
        <div style={{ marginTop: "auto", paddingTop: 12, display: "flex", gap: 14, minHeight: 16 }}>
          {previewLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${artist.name} ${link.title}`}
              onClick={(event) => event.stopPropagation()}
              style={{ color: "rgba(255,255,255,0.4)", display: "flex", textDecoration: "none", transition: "color 200ms" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >
              {platformIcons[link.platform] ?? link.platform}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
