/**
 * Sticky nav: smooth scroll to sections and highlight active section based on scroll position.
 */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function getActiveSection() {
  const scrollY = window.scrollY;
  let active = null;
  for (const section of sections) {
    const top = section.offsetTop - 80;
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      active = section.id;
      break;
    }
  }
  if (!active && sections.length) {
    const first = sections[0];
    if (scrollY < first.offsetTop - 80) active = first.id;
    else active = sections[sections.length - 1].id;
  }
  return active;
}

function setActiveNav(activeId) {
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === `#${activeId}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initNav() {
  initSmoothScroll();

  const onScroll = () => {
    const activeId = getActiveSection();
    setActiveNav(activeId);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial state
}

export { initNav };
