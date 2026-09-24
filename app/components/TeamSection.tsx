"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { artists } from "../data/artists";
import ArtistCard from "./ArtistCard";
import { platformIcons } from "./icons";

type View = "roster" | "leaving" | "detail" | "closing" | "returning";

export default function TeamSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [view, setView] = useState<View>("roster");
  const teamRef = useRef<HTMLElement>(null);
  const returnFocusIndex = useRef<number | null>(null);
  const selected = selectedIndex === null ? null : artists[selectedIndex];

  const openArtist = (index: number) => {
    if (view !== "roster") return;
    setSelectedIndex(index);
    returnFocusIndex.current = index;
    setView("leaving");
  };

  const closeArtist = useCallback(() => {
    setView((current) => current === "detail" ? "closing" : current);
  }, []);

  const finishRosterMotion = () => {
    if (view === "leaving") {
      setView("detail");
      return;
    }
    if (view === "returning") {
      setSelectedIndex(null);
      setView("roster");
    }
  };

  const finishDetailMotion = (event: React.AnimationEvent<HTMLElement>) => {
    if (event.target === event.currentTarget && view === "closing") setView("returning");
  };

  useEffect(() => {
    if (view !== "detail") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeArtist();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeArtist, view]);

  useEffect(() => {
    if (view !== "roster" || returnFocusIndex.current === null) return;
    const index = returnFocusIndex.current;
    returnFocusIndex.current = null;
    requestAnimationFrame(() => {
      const triggers = teamRef.current?.querySelectorAll<HTMLButtonElement>(".roster-card__trigger");
      triggers?.[index]?.focus();
    });
  }, [view]);

  const showCards = view === "roster" || view === "leaving" || view === "returning";

  return (
    <section ref={teamRef} id="team" className="team-section textured-section" aria-label="artists">
      <div className="team-stage">
        {showCards && (
          <div className={`team-roster-view team-roster-view--${view}`}>
            <h2 className="team-eyebrow">team</h2>
            <div className="roster-grid">
              {artists.map((artist, index) => (
                <ArtistCard key={artist.name} artist={artist} index={index} onSelect={() => openArtist(index)} onMotionComplete={index === 0 ? finishRosterMotion : undefined} />
              ))}
            </div>
          </div>
        )}

        {selected && (view === "detail" || view === "closing") && (
          <article className={`artist-detail artist-detail--${view}`} aria-label={`${selected.name} details`} onAnimationEnd={finishDetailMotion}>
            <div className="artist-detail__image">
              {selected.image ? (
                <Image src={selected.image.src} alt={`${selected.name} photo`} fill sizes="(min-width: 960px) 56vw, 100vw" style={{ objectFit: "cover", objectPosition: selected.image.position }} />
              ) : (
                <span className="artist-detail__placeholder" aria-hidden="true">{selected.name.slice(0, 1).toUpperCase()}</span>
              )}
              <div className="artist-detail__image-shade" />
              <span className="artist-detail__count">0{(selectedIndex ?? 0) + 1} / 0{artists.length}</span>
            </div>

            <div className="artist-detail__info">
              <button className="artist-detail__close" type="button" onClick={closeArtist} aria-label="Close artist details" autoFocus><span /><span /></button>
              <p className="artist-detail__role">{selected.role}</p>
              <h3>{selected.name}</h3>
              <p className="artist-detail__bio">{selected.expandedBio}</p>

              {selected.tags.length > 0 && (
                <div className="artist-detail__meta">
                  <span>sound</span>
                  <div className="artist-detail__tags">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              )}

              {selected.links.length > 0 && (
                <div className="artist-detail__links" aria-label={`${selected.name} links`}>
                  {selected.links.map((link) => (
                    <a key={`${link.platform}-${link.title}`} href={link.url} target="_blank" rel="noreferrer" aria-label={`${selected.name} ${link.title}`}>
                      {platformIcons[link.platform] ?? link.platform}
                      <span>{link.title}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
