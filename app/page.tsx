"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import yolobunPortrait from "./media/henwoo niteharts.jpeg";

const words = ["creative", "community", "music", "idek", "vibes", "coming soon"];
const typingDelay = 90;
const deletingDelay = 55;
const holdDelay = 1100;
const nextWordDelay = 250;

const artists = [
  {
    name: "yolobun",
    role: "founder sorta / producer",
    tags: ["dubstep", "bass house", "trap", "melodic"],
    bio: "idk what i'ma do with this collective but let's have some fun lol",
    soundcloud: "https://soundcloud.com/yolobunmusic",
  },
  {
    name: "artist 02",
    role: "Coming Soon",
    tags: [],
    bio: "A new voice joining the roster. Stay tuned.",
  },
  {
    name: "artist 03",
    role: "Coming Soon",
    tags: [],
    bio: "Something's brewing. Watch this space.",
  },
];

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(words[0].length);
  const [isDeleting, setIsDeleting] = useState(true);
  const [activeArtist, setActiveArtist] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(0);
  const typedWord = words[wordIndex].slice(0, letterIndex);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const word = words[wordIndex];
    let delay = isDeleting ? deletingDelay : typingDelay;

    if (!isDeleting && letterIndex === word.length) delay = holdDelay;
    else if (isDeleting && letterIndex === 0) delay = nextWordDelay;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && letterIndex === word.length) {
        setIsDeleting(true);
        return;
      }
      if (isDeleting && letterIndex === 0) {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
        return;
      }
      setLetterIndex((i) => i + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [isDeleting, letterIndex, wordIndex]);

  const prev = () => setActiveArtist((i) => (i - 1 + artists.length) % artists.length);
  const next = () => setActiveArtist((i) => (i + 1) % artists.length);

  const onDragStart = (x: number) => {
    setDragging(true);
    dragStartX.current = x;
  };
  const onDragEnd = (x: number) => {
    if (!dragging) return;
    setDragging(false);
    const delta = dragStartX.current - x;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
  };

  return (
    <main>
      {/* Hero */}
      <section
        className="relative grid min-h-dvh place-items-center p-6"
        style={{ scrollSnapAlign: "start" }}
        aria-label="yolobun landing page"
      >
        <div className="grid translate-y-[-1vh] place-items-center gap-3.5 text-center">
          <h1 className="m-0 text-[clamp(56px,11vw,144px)] font-medium leading-[0.9] tracking-normal">
            yolobun
          </h1>
          <p
            className="m-0 inline-flex min-h-[1.3em] min-w-[10ch] items-center justify-center text-[clamp(18px,3vw,34px)] font-normal leading-[1.3] tracking-normal text-white/70"
            aria-label="yolobun is creative, community, music, matcha, vibes, coming soon"
          >
            <span>{typedWord}</span>
            <span
              className="cursor ml-[5px] inline-block h-[1em] w-0.5 animate-[blink_900ms_steps(1)_infinite] bg-current"
              aria-hidden="true"
            />
          </p>
        </div>
        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs tracking-widest uppercase">
          <span>scroll</span>
          <span className="block h-6 w-px bg-white/20" />
        </div>
      </section>

      {/* Artists */}
      <section
        className="relative min-h-dvh flex flex-col items-center justify-center px-6 py-20 bg-[#0a0a0a]"
        style={{ scrollSnapAlign: "start" }}
        aria-label="artists"
      >
        <h2 className="mb-12 text-xs tracking-[0.3em] uppercase text-white/40">The Roster</h2>

        <div
          className="w-full max-w-sm select-none cursor-grab active:cursor-grabbing"
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseUp={(e) => onDragEnd(e.clientX)}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
        >
          {/* Card */}
          <div className="rounded-2xl border border-white/10 bg-[#111] overflow-hidden">
            {/* Artist image */}
            <div className="w-full aspect-square bg-[#1a1a1a] flex items-center justify-center">
              {activeArtist === 0 ? (
                <Image
                  src={yolobunPortrait}
                  alt="yolobun at a show"
                  className="h-full w-full object-cover object-center"
                  priority
                />
              ) : (
                <div className="text-white/10 text-7xl font-bold select-none">
                  {artists[activeArtist].name.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>
            {/* Info */}
            <div className="p-6">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-xl font-medium">{artists[activeArtist].name}</h3>
                <span className="text-xs text-white/40">{artists[activeArtist].role}</span>
              </div>
              <p className="text-sm text-white/50 mb-4">{artists[activeArtist].bio}</p>
              <div className="flex gap-2 flex-wrap">
                {artists[activeArtist].tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full border border-white/10 text-xs text-white/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {artists[activeArtist].soundcloud && (
                <a
                  href={artists[activeArtist].soundcloud}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex text-xs text-white/50 transition-colors hover:text-white"
                >
                  SoundCloud ↗
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center gap-6">
          <button
            onClick={prev}
            className="h-9 w-9 rounded-full border border-white/10 text-white/40 hover:border-white/30 hover:text-white/70 transition-colors flex items-center justify-center text-lg"
            aria-label="previous artist"
          >
            ←
          </button>
          <div className="flex gap-2">
            {artists.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveArtist(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeArtist ? "w-6 bg-white" : "w-1.5 bg-white/20"
                }`}
                aria-label={`go to artist ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="h-9 w-9 rounded-full border border-white/10 text-white/40 hover:border-white/30 hover:text-white/70 transition-colors flex items-center justify-center text-lg"
            aria-label="next artist"
          >
            →
          </button>
        </div>
      </section>

      {/* About */}
      <section
        className="relative min-h-dvh flex flex-col items-center justify-center px-6 py-20"
        style={{ scrollSnapAlign: "start" }}
        aria-label="about"
      >
        <div className="max-w-lg text-center">
          <h2 className="mb-8 text-xs tracking-[0.3em] uppercase text-white/40">About</h2>
          <p className="text-[clamp(22px,4vw,40px)] font-medium leading-[1.2] mb-8">
            yolobun is a creative collective built on music, community, and culture.
          </p>
          <p className="text-white/50 text-base leading-relaxed mb-4">
            some more filler text.
          </p>
          <p className="text-white/30 text-sm leading-relaxed">
            and even more filler text.
          </p>
        </div>
      </section>
    </main>
  );
}
