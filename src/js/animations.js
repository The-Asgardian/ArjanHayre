/**
 * Single Intersection Observer: adds .visible when elements with data-animate enter view.
 * Call observeAnimateTargets() after dynamically adding elements with data-animate.
 */
const VISIBLE_CLASS = 'visible';
const DEFAULT_THRESHOLD = 0.1;
const DEFAULT_ROOT_MARGIN = '0px 0px -50px 0px';

let observer = null;

function createObserver() {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(VISIBLE_CLASS);
        }
      });
    },
    {
      threshold: DEFAULT_THRESHOLD,
      rootMargin: DEFAULT_ROOT_MARGIN,
    }
  );
}

function observeAnimateTargets() {
  if (!observer) observer = createObserver();
  document.querySelectorAll('[data-animate]').forEach((el) => {
    if (!el.classList.contains(VISIBLE_CLASS)) observer.observe(el);
  });
}

function initAnimations() {
  observeAnimateTargets();
}

export { initAnimations, observeAnimateTargets };
