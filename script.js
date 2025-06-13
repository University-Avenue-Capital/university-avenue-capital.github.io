const titleText = "University Avenue Capital";
const taglineText = "Have an idea worth funding? Contact us.";

const titleContainer = document.getElementById("dynamicTitle");
const taglineContainer = document.getElementById("dynamicTagline");

// Create letter spans for the title (one span per character)
function createSpannedText(container, text) {
  [...text].forEach(char => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    container.appendChild(span);
  });
}

// Create word containers with letter spans for tagline to prevent breaking words mid-word
function createSpannedWords(container, text) {
  const words = text.split(" ");
  words.forEach((word, index) => {
    const wordSpan = document.createElement("span");
    wordSpan.classList.add("word");
    [...word].forEach(char => {
      const letterSpan = document.createElement("span");
      letterSpan.textContent = char;
      wordSpan.appendChild(letterSpan);
    });
    // Add a non-breaking space after each word except the last one
    if(index !== words.length - 1) {
      wordSpan.appendChild(document.createTextNode('\u00A0'));
    }
    container.appendChild(wordSpan);
  });
}

createSpannedText(titleContainer, titleText);
createSpannedWords(taglineContainer, taglineText);

// On mouse move, update colors of title and tagline letters based on proximity
document.addEventListener("mousemove", (e) => {
  const allSpans = document.querySelectorAll(".title span, .tagline .word span");
  allSpans.forEach(span => {
    const rect = span.getBoundingClientRect();
    const dx = rect.left + rect.width / 2 - e.clientX;
    const dy = rect.top + rect.height / 2 - e.clientY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 150;
    const intensity = Math.max(0, 1 - distance / maxDist);

    if(span.parentElement.classList.contains("word")) {
      // tagline letters: from #444 (68,68,68) to #c00 (204,0,0)
      const startColor = 68;
      const r = Math.floor(startColor + (204 - startColor) * intensity);
      const g = Math.floor(startColor - startColor * intensity);
      const b = Math.floor(startColor - startColor * intensity);
      span.style.color = `rgb(${r}, ${g}, ${b})`;
    } else {
      // title letters: from #111 (17,17,17) to #c00 (204,0,0)
      const r = Math.floor(17 + (204 - 17) * intensity);
      const g = Math.floor(17 - 17 * intensity);
      const b = Math.floor(17 - 17 * intensity);
      span.style.color = `rgb(${r}, ${g}, ${b})`;
    }
  });
});