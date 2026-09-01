// ------------------------------------------------------------
// A NIGHT WITH HARRY BREARLEY — POEM MACHINE
// Plain JavaScript, deliberately written to be easy to edit.
// ------------------------------------------------------------

// Waiting for DOMContentLoaded makes this file work even if the script tag
// is moved out of the <head> or the "defer" attribute is accidentally removed.
document.addEventListener("DOMContentLoaded", () => {

const adjectiveWords = [...document.querySelectorAll(".adjective")];
const nounWords = [...document.querySelectorAll(".noun")];

const shuffleButton = document.querySelector("#shuffle-button");
const nounSlider = document.querySelector("#noun-slider");
const nounOutput = document.querySelector("#noun-output");
const chaosButton = document.querySelector("#chaos-button");
const resetButton = document.querySelector("#reset-button");
const statusMessage = document.querySelector("#status");

// Save the original adjectives once, as soon as the page loads.
const originalAdjectives = adjectiveWords.map((word) => word.textContent.trim());

// This is a SMALL, handmade noun dictionary for version 1.
// The code alphabetizes it below. Add as many nouns as you like!
const nounDictionary = [
  "accordion", "agent", "album", "angel", "apparition", "archive", "asteroid",
  "balloon", "beauty", "birthday", "blade", "blessing", "bolt", "bouquet",
  "building", "butterfly", "cabaret", "cactus", "candle", "catastrophe",
  "ceiling", "champagne", "chicken", "choice", "choir", "cigarette", "circus",
  "cloud", "cocktail", "confession", "constellation", "couch", "cowboy", "crystal",
  "dancer", "delusion", "diamond", "dictionary", "disaster", "disco", "dream",
  "earring", "echo", "eclipse", "egg", "elevator", "emerald", "ex", "eyelash",
  "family", "fantasy", "feather", "feud", "finger", "firework", "flamingo",
  "flower", "forceps", "friend", "ghost", "glitter", "guest", "halo", "heart",
  "horizon", "hotel", "iceberg", "jellyfish", "jewelry", "key", "kiss", "knuckle",
  "labyrinth", "lamp", "leopard", "life", "light", "list", "love", "machine",
  "margarita", "mask", "mermaid", "meteor", "mirror", "moon", "moth", "museum",
  "needle", "night", "ocean", "oracle", "orchid", "palace", "pan", "panel",
  "paradise", "party", "pearl", "perfume", "planet", "plastic", "poem", "portrait",
  "pot", "prophecy", "pyramid", "queen", "rainbow", "relic", "rhinestone",
  "ritual", "romance", "sameness", "satellite", "scandal", "seashell", "secret",
  "shadow", "shirt", "shoe", "skeleton", "sorrow", "soul", "sparkle", "staff",
  "star", "steel", "storm", "surgery", "table", "tattoo", "telephone", "tooth",
  "truth", "tulip", "undernetting", "unicorn", "velvet", "vision", "weapon",
  "whisper", "world", "wound", "year", "zebra"
].sort((a, b) => a.localeCompare(b));

let chaosTimer = null;
let chaosIsOn = false;

function shuffleArray(items) {
  // Fisher–Yates shuffle: swap each item with a random earlier item.
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

function animateWords(words) {
  words.forEach((word, index) => {
    word.classList.remove("word-pop");

    // Stagger the animation very slightly so the change ripples down the poem.
    window.setTimeout(() => word.classList.add("word-pop"), index * 9);
  });
}

function shuffleAdjectives() {
  const currentWords = adjectiveWords.map((word) => word.textContent.trim());
  let shuffledWords = shuffleArray(currentWords);

  // Avoid a shuffle that accidentally returns the exact same order.
  if (shuffledWords.every((word, index) => word === currentWords[index])) {
    shuffledWords = [...shuffledWords.slice(1), shuffledWords[0]];
  }

  adjectiveWords.forEach((word, index) => {
    word.textContent = shuffledWords[index];
  });

  animateWords(adjectiveWords);
  statusMessage.textContent = "Adjectives compromised";
}

function pluralize(word) {
  const irregularPlurals = {
    ex: "exes",
    family: "families",
    life: "lives",
    tooth: "teeth"
  };

  if (irregularPlurals[word]) return irregularPlurals[word];
  if (/(s|x|z|ch|sh)$/.test(word)) return `${word}es`;
  if (/[^aeiou]y$/.test(word)) return `${word.slice(0, -1)}ies`;
  return `${word}s`;
}

function preserveCapitalization(newWord, oldWord) {
  const startsWithCapital = oldWord.charAt(0) === oldWord.charAt(0).toUpperCase();
  return startsWithCapital
    ? newWord.charAt(0).toUpperCase() + newWord.slice(1)
    : newWord;
}

function replaceNouns(offset) {
  nounWords.forEach((word) => {
    const originalLemma = word.dataset.lemma;
    const originalIndex = nounDictionary.indexOf(originalLemma);

    // If a word is ever missing from the dictionary, leave it alone.
    if (originalIndex === -1 || offset === 0) {
      word.textContent = word.dataset.original;
      return;
    }

    const replacementIndex = (originalIndex + offset) % nounDictionary.length;
    let replacement = nounDictionary[replacementIndex];

    if (word.dataset.number === "plural") {
      replacement = pluralize(replacement);
    }

    word.textContent = preserveCapitalization(replacement, word.dataset.original);
  });

  nounOutput.value = `N+${offset}`;
  nounSlider.value = offset;
  animateWords(nounWords);
  statusMessage.textContent = offset === 0 ? "Original nouns" : `Nouns displaced by ${offset}`;
}

function makeChaosParticle() {
  const symbols = ["✦", "🦋", "★", "💋", "⚡", "🍸", "✧", "🪩"];
  const particle = document.createElement("span");

  particle.className = "chaos-particle";
  particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  particle.style.left = `${Math.random() * 94}vw`;
  particle.style.top = `${20 + Math.random() * 70}vh`;
  particle.style.transform = `rotate(${Math.random() * 180}deg)`;
  document.body.append(particle);

  window.setTimeout(() => particle.remove(), 1900);
}

function chaosBeat() {
  shuffleAdjectives();
  const randomOffset = Math.floor(Math.random() * 15) + 1;
  replaceNouns(randomOffset);
  statusMessage.textContent = `CHAOS: N+${randomOffset} / adjectives loose`;

  for (let count = 0; count < 5; count += 1) {
    window.setTimeout(makeChaosParticle, count * 90);
  }
}

function startChaos() {
  chaosIsOn = true;
  document.body.classList.add("chaos");
  chaosButton.setAttribute("aria-pressed", "true");
  chaosButton.innerHTML = '<span aria-hidden="true">✋</span> Stop chaos';
  chaosBeat();
  chaosTimer = window.setInterval(chaosBeat, 1800);
}

function stopChaos() {
  chaosIsOn = false;
  document.body.classList.remove("chaos");
  chaosButton.setAttribute("aria-pressed", "false");
  chaosButton.innerHTML = '<span aria-hidden="true">⚡</span> Chaos mode';
  window.clearInterval(chaosTimer);
  chaosTimer = null;
}

function resetPoem() {
  stopChaos();

  adjectiveWords.forEach((word, index) => {
    word.textContent = originalAdjectives[index];
  });

  replaceNouns(0);
  nounSlider.value = 0;
  nounOutput.value = "N+0";
  statusMessage.textContent = "Original poem";
  animateWords([...adjectiveWords, ...nounWords]);
}

// Before changing anything, save each noun's exact original spelling.
nounWords.forEach((word) => {
  word.dataset.original = word.textContent.trim();
});

shuffleButton.addEventListener("click", shuffleAdjectives);

nounSlider.addEventListener("input", (event) => {
  replaceNouns(Number(event.target.value));
});

chaosButton.addEventListener("click", () => {
  if (chaosIsOn) {
    stopChaos();
    statusMessage.textContent = "Chaos contained (for now)";
  } else {
    startChaos();
  }
});

resetButton.addEventListener("click", resetPoem);

});