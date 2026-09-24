"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { artists, type Artist } from "../data/artists";
import ArtistCard from "./ArtistCard";
import { platformIcons } from "./icons";
import yolobunPortrait from "../media/yolobun.jpg";
import nianPortrait from "../media/nian.jpg";

type View = "roster" | "leaving" | "detail" | "closing" | "returning";

const portraitFor = (artist: Artist) =>
  artist.name === "nian" ? nianPortrait : yolobunPortrait;

export default function TeamSection() {
  const [selected, setSelected] = useState<Artist | null>(null);
  const [view, setView] = useState<View>("roster");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const openArtist = (artist: Artist) => {
    if (view !== "roster") return;
    setSelected(artist);
    setView("leaving");
    timerRef.current = setTimeout(() => setView("detail"), 560);
  };

  const closeArtist = () => {
    if (view !== "detail") return;
    setView("closing");
    timerRef.current = setTimeout(() => {
      setView("returning");
      timerRef.current = setTimeout(() => {
        setSelected(null);
        setView("roster");
      }, 650);
    }, 360);
  };

  useEffect(() => {
    if (view !== "detail") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeArtist();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [view]);

  const showCards = view === "roster" || view === "leaving" || view === "returning";

  return (
    <section id="team" className="team-section" aria-label="artists">
      <div className="team-stage">
        {showCards && (
          <div className={`team-roster-view team-roster-view--${view}`}>
            <h2 className="team-eyebrow">team</h2>
            <div className="roster-grid">
              {artists.map((artist, index) => (
                <ArtistCard
                  key={artist.name}
                  artist={artist}
                  index={index}
                  onSelect={() => openArtist(artist)}
                />
              ))}
            </div>
          </div>
        )}

        {selected && (view === "detail" || view === "closing") && (
          <article className={`artist-detail artist-detail--${view}`} aria-label={`${selected.name} details`}>
            <div className="artist-detail__image">
              {selected.image ? (
                <Image
                  src={portraitFor(selected)}
                  alt={`${selected.name} photo`}
                  fill
                  sizes="(min-width: 960px) 56vw, 100vw"
                  style={{ objectFit: "cover", objectPosition: selected.name === "yolobun" ? "center center" : "center top" }}
                  priority
                />
              ) : (
                <span className="artist-detail__placeholder" aria-hidden="true">{selected.name.slice(0, 1).toUpperCase()}</span>
              )}
              <div className="artist-detail__image-shade" />
              <span className="artist-detail__count">0{artists.indexOf(selected) + 1} / 0{artists.length}</span>
            </div>

            <div className="artist-detail__info">
              <button className="artist-detail__close" type="button" onClick={closeArtist} aria-label="Close artist details">
                <span />
                <span />
              </button>
              <p className="artist-detail__role">{selected.role}</p>
              <h3>{selected.name}</h3>
              <p className="artist-detail__bio">{selected.bio}</p>

              {selected.tags.length > 0 && (
                <div className="artist-detail__meta">
                  <span>sound</span>
                  <div className="artist-detail__tags">
                    {selected.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              )}

              {selected.links.length > 0 && (
                <div className="artist-detail__links" aria-label={`${selected.name} links`}>
                  {selected.links.map((link) => (
                    <a key={link.url} href={link.url} target="_blank" rel="noreferrer" aria-label={link.label}>
                      {platformIcons[link.label] ?? link.label}
                      <span>{link.label}</span>
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
