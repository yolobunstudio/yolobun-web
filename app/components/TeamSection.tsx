"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { artists } from "../data/artists";
import type { Artist } from "../data/artists";
import ArtistCard from "./ArtistCard";
import { platformIcons } from "./icons";
import yolobunPortrait from "../media/yolobun.jpg";
import nianPortrait from "../media/nian.jpg";

const DETAIL_ANIMATION_MS = 460;
const CARD_RETURN_MS = 420;

type ActiveArtist = {
  artist: Artist;
  origin: {
    height: number;
    left: number;
    top: number;
    width: number;
  };
  isClosing: boolean;
};

type DetailMotion = {
  dx: number;
  dy: number;
  scaleX: number;
  scaleY: number;
};

export default function TeamSection() {
  const [activeArtist, setActiveArtist] = useState<ActiveArtist | null>(null);
  const [hasRevealedCards, setHasRevealedCards] = useState(false);
  const [returningArtistName, setReturningArtistName] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeArtist) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeActiveArtist();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeArtist]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || hasRevealedCards) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealedCards(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 },
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, [hasRevealedCards]);

  function openArtist(artist: Artist, originRect: DOMRect) {
    setReturningArtistName(null);
    setActiveArtist({
      artist,
      origin: {
        height: originRect.height,
        left: originRect.left,
        top: originRect.top,
        width: originRect.width,
      },
      isClosing: false,
    });
  }

  function closeActiveArtist() {
    setActiveArtist((current) => (current ? { ...current, isClosing: true } : current));
  }

  return (
    <section id="team" className="textured-section" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100dvh", padding: "80px 0", background: "#121212", scrollSnapAlign: "start", isolation: "isolate", overflow: "hidden" }} aria-label="artists">
      <h2 style={{ margin: "0 0 48px", padding: "0 24px", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>team</h2>
      <div className="roster-grid" ref={gridRef}>
        {artists.map((artist, index) => (
          <ArtistCard
            key={artist.name}
            artist={artist}
            index={index}
            isActive={activeArtist?.artist.name === artist.name}
            isRevealed={hasRevealedCards}
            isReturning={returningArtistName === artist.name}
            onOpen={(origin) => openArtist(artist, origin)}
          />
        ))}
      </div>
      {activeArtist ? (
        <ArtistDetail
          activeArtist={activeArtist}
          onClose={closeActiveArtist}
          onClosed={() => {
            setReturningArtistName(activeArtist.artist.name);
            setActiveArtist(null);
            window.setTimeout(() => setReturningArtistName(null), CARD_RETURN_MS);
          }}
        />
      ) : null}
    </section>
  );
}

function ArtistDetail({ activeArtist, onClose, onClosed }: { activeArtist: ActiveArtist; onClose: () => void; onClosed: () => void }) {
  const { artist, origin, isClosing } = activeArtist;
  const portrait = artist.name === "nian" ? nianPortrait : yolobunPortrait;
  const shellRef = useRef<HTMLElement>(null);
  const [motion, setMotion] = useState<DetailMotion | null>(null);
  const [backdropVisible, setBackdropVisible] = useState(false);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const finalRect = shell.getBoundingClientRect();
    setMotion({
      dx: origin.left + origin.width / 2 - (finalRect.left + finalRect.width / 2),
      dy: origin.top + origin.height / 2 - (finalRect.top + finalRect.height / 2),
      scaleX: origin.width / finalRect.width,
      scaleY: origin.height / finalRect.height,
    });
  }, [origin]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setBackdropVisible(!isClosing));
    return () => window.cancelAnimationFrame(frame);
  }, [isClosing]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || !motion) return;

    const halfwayScaleX = motion.scaleX + (1 - motion.scaleX) * 0.52;
    const halfwayScaleY = motion.scaleY + (1 - motion.scaleY) * 0.34;
    const originTransform = `translate3d(${motion.dx}px, ${motion.dy}px, 0) rotateY(-180deg) scale(${motion.scaleX}, ${motion.scaleY})`;
    const foldTransform = `translate3d(${motion.dx * 0.82}px, ${motion.dy * 0.82}px, 0) rotateY(-88deg) scale(${motion.scaleX * 1.04}, ${motion.scaleY * 0.98})`;
    const formatTransform = `translate3d(${motion.dx * 0.38}px, ${motion.dy * 0.38}px, 0) rotateY(180deg) scale(${halfwayScaleX}, ${halfwayScaleY})`;
    const nearlyOpenTransform = "translate3d(0, 0, 0) rotateY(326deg) scale(1.018, 1.01)";
    const finalTransform = "translate3d(0, 0, 0) rotateY(360deg) scale(1)";
    const closeLiftTransform = "translate3d(0, -18px, 0) scale(0.992)";
    const closeExitTransform = "translate3d(0, calc(-100dvh - 160px), 0) scale(0.94)";
    const animation = shell.animate(
      isClosing
        ? [
            { opacity: 1, transform: finalTransform, offset: 0 },
            { opacity: 1, transform: closeLiftTransform, offset: 0.2 },
            { opacity: 0, transform: closeExitTransform, offset: 1 },
          ]
        : [
            { opacity: 0.98, transform: originTransform, offset: 0 },
            { opacity: 0.98, transform: foldTransform, offset: 0.18 },
            { opacity: 1, transform: formatTransform, offset: 0.54 },
            { opacity: 1, transform: nearlyOpenTransform, offset: 0.82 },
            { opacity: 1, transform: finalTransform, offset: 1 },
          ],
      {
        duration: isClosing ? DETAIL_ANIMATION_MS : 560,
        easing: isClosing ? "cubic-bezier(0.72, 0, 0.28, 1)" : "cubic-bezier(0.2, 0.82, 0.16, 1)",
        fill: "forwards",
      },
    );

    let closeTimer: number | undefined;
    if (isClosing) {
      closeTimer = window.setTimeout(onClosed, DETAIL_ANIMATION_MS + 80);
    }

    return () => {
      if (closeTimer) window.clearTimeout(closeTimer);
      animation.cancel();
    };
  }, [isClosing, motion, onClosed]);

  return (
    <div
      className={`artist-detail-overlay${isClosing ? " artist-detail-overlay--closing" : ""}`}
      style={{
        backdropFilter: backdropVisible ? "blur(2px)" : "blur(0)",
        background: backdropVisible ? "rgba(0,0,0,0.72)" : "rgba(0,0,0,0)",
        transition: isClosing ? "background 420ms ease-in, backdrop-filter 420ms ease-in" : "background 360ms ease-out, backdrop-filter 360ms ease-out",
      }}
      onClick={onClose}
      role="presentation"
    >
      <article
        ref={shellRef}
        className={`artist-detail-shell${motion ? " artist-detail-shell--ready" : ""}${isClosing ? " artist-detail-shell--closing" : ""}`}
        style={{
          "--detail-dx": `${motion?.dx ?? 0}px`,
          "--detail-dy": `${motion?.dy ?? 0}px`,
          "--detail-scale-x": motion?.scaleX ?? 1,
          "--detail-scale-y": motion?.scaleY ?? 1,
          animation: "none",
        } as React.CSSProperties}
        onClick={(event) => event.stopPropagation()}
        aria-label={`${artist.name} profile`}
      >
        <button className="artist-detail-close" type="button" aria-label="close profile" onClick={onClose}>
          x
        </button>
        <div className="artist-detail-media">
          {artist.image ? (
            <Image
              src={portrait}
              alt={`${artist.name} photo`}
              fill
              style={{ objectFit: "cover", objectPosition: artist.name === "yolobun" ? "center center" : "center top" }}
              draggable={false}
              sizes="(min-width: 960px) 36vw, 92vw"
            />
          ) : (
            <div className="artist-detail-initial">{artist.name.slice(0, 1).toUpperCase()}</div>
          )}
        </div>
        <div className="artist-detail-copy">
          <div>
            <p className="artist-detail-kicker">{artist.role}</p>
            <h3>{artist.name}</h3>
          </div>
          <p className="artist-detail-bio">{artist.expandedBio}</p>
          <div className="artist-detail-tags" aria-label={`${artist.name} tags`}>
            {artist.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="artist-detail-links">
            {artist.links.map((link) => (
              <a key={`${link.platform}-${link.title}`} href={link.url} target="_blank" rel="noreferrer">
                <span className="artist-detail-link-icon">{platformIcons[link.platform] ?? link.platform.slice(0, 1)}</span>
                <span>
                  <strong>{link.title}</strong>
                  <small>{link.description}</small>
                </span>
              </a>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
