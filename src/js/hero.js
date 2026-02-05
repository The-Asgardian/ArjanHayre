/**
 * Optional typing / terminal effect for hero subtitle.
 */
const TYPING_SPEED = 60;
const PAUSE_AT_END = 2000;
const PAUSE_BEFORE_LOOP = 800;

function typeWriter(element, text, speed = TYPING_SPEED) {
  return new Promise((resolve) => {
    let i = 0;
    element.textContent = '';
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    }
    type();
  });
}

function initHero() {
  const subtitleEl = document.getElementById('hero-subtitle');
  if (!subtitleEl) return;

  const lines = [
    'Full-Stack & Backend Engineer · Distributed Systems · ML',
    'Microservices · React · Spring Boot · PyTorch',
  ];
  let lineIndex = 0;

  function cycle() {
    const text = lines[lineIndex];
    lineIndex = (lineIndex + 1) % lines.length;
    typeWriter(subtitleEl, text)
      .then(() => new Promise((r) => setTimeout(r, PAUSE_AT_END)))
      .then(() => {
        subtitleEl.textContent = '';
        return new Promise((r) => setTimeout(r, PAUSE_BEFORE_LOOP));
      })
      .then(cycle);
  }

  cycle();
}

export { initHero };
