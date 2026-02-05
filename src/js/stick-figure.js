/**
 * Animated stick figure: jumps across sections with parabolic arc, plays idle/jump/land poses.
 * Uses Rostro-generated frames when available; otherwise SVG. Respects prefers-reduced-motion.
 */

const SECTION_IDS = ['#hero', '#about', '#skills', '#projects', '#contact'];
const IDLE_DURATION_MS = 10000;
const JUMP_DURATION_MS = 1500;
const LAND_DURATION_MS = 400;
const FIGURE_WIDTH = 40;
const FIGURE_HEIGHT = 70;
const FIGURE_WIDTH_IMG = 48;
const FIGURE_HEIGHT_IMG = 60;
const ARC_HEIGHT = 120;

/** Rostro-generated Henry Stickmin style frames (idle, jump, land) */
const ROSTRO_FRAMES = {
  idle: 'https://media.rostro.dev/86a2b26c-2af5-4dd3-b1a4-b09475cce874/36e87229-8825-4af9-b0e6-acb9814ba198.png',
  jump: 'https://media.rostro.dev/28379013-9c7f-4d07-bfb4-92c165f7dd69/b32db4da-e883-4a0c-9b14-9f89ec1586f2.png',
  land: 'https://media.rostro.dev/abbb197b-3829-48d3-9445-cb09bcb9f5dd/c16d518b-0add-47df-acac-5880a6049d3e.png',
};

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function getTargetPosition(section) {
  const padding = 60;
  const minX = padding;
  const maxX = typeof window !== 'undefined' ? window.innerWidth - padding : 400;
  const minY = 80;
  const maxY = typeof window !== 'undefined' ? window.innerHeight - 40 : 500;
  const fallback = { x: maxX - 20, y: Math.min(300, maxY - 50) };
  if (!section) return fallback;
  const rect = section.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return fallback;
  let x = rect.right - padding;
  let y = rect.bottom - 30;
  x = Math.max(minX, Math.min(maxX, x));
  y = Math.max(minY, Math.min(maxY, y));
  return { x, y };
}

function initStickFigure() {
  const wrapper = document.getElementById('stick-figure-wrapper');
  const bodyEl = document.getElementById('figure-body');
  const imgEl = document.getElementById('stick-figure-img');
  const bgEl = document.getElementById('stick-figure-bg');
  if (!wrapper || !bodyEl || !bgEl) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    bgEl.style.visibility = 'hidden';
    return;
  }

  const useRostroFrames = imgEl && ROSTRO_FRAMES.idle;
  const width = useRostroFrames ? FIGURE_WIDTH_IMG : FIGURE_WIDTH;
  const height = useRostroFrames ? FIGURE_HEIGHT_IMG : FIGURE_HEIGHT;

  if (useRostroFrames) {
    wrapper.classList.add('use-rostro-frames');
    imgEl.src = ROSTRO_FRAMES.idle;
  }

  const sections = SECTION_IDS.map((id) => document.querySelector(id)).filter(Boolean);
  if (sections.length === 0) return;

  let currentIndex = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = null;

  function setPosition(x, y) {
    wrapper.style.left = `${x - width / 2}px`;
    wrapper.style.top = `${y - height}px`;
    currentX = x;
    currentY = y;
  }

  function setPose(pose) {
    bodyEl.classList.remove('pose-idle', 'pose-jump', 'pose-land');
    bodyEl.classList.add(pose);
    if (useRostroFrames && imgEl && ROSTRO_FRAMES[pose]) {
      imgEl.src = ROSTRO_FRAMES[pose];
    }
  }

  function runJump(targetX, targetY, onComplete) {
    const startX = currentX;
    const startY = currentY;
    const startTime = performance.now();

    setPose('pose-jump');

    function tick(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / JUMP_DURATION_MS, 1);
      const easeT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      const x = lerp(startX, targetX, easeT);
      const arc = 4 * t * (1 - t);
      const y = lerp(startY, targetY, easeT) - ARC_HEIGHT * arc;

      setPosition(x, y);

      if (t >= 1) {
        setPosition(targetX, targetY);
        setPose('pose-land');
        if (onComplete) onComplete();
        return;
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
  }

  function scheduleNextJump() {
    const nextIndex = (currentIndex + 1) % sections.length;
    const section = sections[nextIndex];
    const target = getTargetPosition(section);

    runJump(target.x, target.y, () => {
      currentIndex = nextIndex;
      setTimeout(() => {
        setPose('pose-idle');
        setTimeout(scheduleNextJump, IDLE_DURATION_MS);
      }, LAND_DURATION_MS);
    });
  }

  function start() {
    const first = sections[0];
    const target = getTargetPosition(first);
    setPosition(target.x, target.y);
    currentIndex = 0;
    setPose('pose-idle');
    setTimeout(scheduleNextJump, IDLE_DURATION_MS);
  }

  if (useRostroFrames && imgEl) {
    imgEl.onerror = () => {
      wrapper.classList.remove('use-rostro-frames');
      imgEl.removeAttribute('src');
      setPose('pose-idle');
    };
  }

  function handleResize() {
    const section = sections[currentIndex];
    const target = getTargetPosition(section);
    setPosition(target.x, target.y);
  }

  window.addEventListener('resize', handleResize);
  window.addEventListener('scroll', handleResize, { passive: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    requestAnimationFrame(start);
  }
}

export { initStickFigure };
