"use client";

import { useEffect, useState } from "react";

const words = ["creative", "community", "music", "matcha", "vibes", "coming soon"];
const typingDelay = 90;
const deletingDelay = 55;
const holdDelay = 1100;
const nextWordDelay = 250;

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(words[0].length);
  const [isDeleting, setIsDeleting] = useState(true);
  const typedWord = words[wordIndex].slice(0, letterIndex);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const word = words[wordIndex];
    let delay = isDeleting ? deletingDelay : typingDelay;

    if (!isDeleting && letterIndex === word.length) {
      delay = holdDelay;
    } else if (isDeleting && letterIndex === 0) {
      delay = nextWordDelay;
    }

    const timeout = window.setTimeout(() => {
      if (!isDeleting && letterIndex === word.length) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && letterIndex === 0) {
        setIsDeleting(false);
        setWordIndex((currentIndex) => (currentIndex + 1) % words.length);
        return;
      }

      setLetterIndex((currentIndex) => currentIndex + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [isDeleting, letterIndex, wordIndex]);

  return (
    <main
      className="relative grid min-h-dvh place-items-center p-6"
      aria-label="yolobun landing page"
    >
      <section className="grid translate-y-[-1vh] place-items-center gap-3.5 text-center">
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
      </section>
    </main>
  );
}
