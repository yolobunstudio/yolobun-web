const words = ["creative", "community", "music", "matcha", "vibes", "coming soon"];
const typedWord = document.querySelector("#typed-word");

const typingDelay = 90;
const deletingDelay = 55;
const holdDelay = 1100;
const nextWordDelay = 250;

let wordIndex = 0;
let letterIndex = words[wordIndex].length;
let isDeleting = true;

function typeLoop() {
  const word = words[wordIndex];
  typedWord.textContent = word.slice(0, letterIndex);

  if (!isDeleting && letterIndex === word.length) {
    isDeleting = true;
    window.setTimeout(typeLoop, holdDelay);
    return;
  }

  if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    window.setTimeout(typeLoop, nextWordDelay);
    return;
  }

  letterIndex += isDeleting ? -1 : 1;
  window.setTimeout(typeLoop, isDeleting ? deletingDelay : typingDelay);
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.setTimeout(typeLoop, holdDelay);
}
