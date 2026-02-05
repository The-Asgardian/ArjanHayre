import './style.css';
import { initNav } from './js/nav.js';
import { initAnimations } from './js/animations.js';
import { initHero } from './js/hero.js';
import { initTheme } from './js/theme.js';
import { initStickFigure } from './js/stick-figure.js';

// Render skills from JSON into #skills-grid
async function renderSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;
  const data = await import('./data/skills.json');
  const skills = data.default;
  grid.innerHTML = skills
    .map(
      (s) => `
    <article class="skill-card" data-animate>
      <span class="skill-icon" aria-hidden="true">${s.icon}</span>
      <h3 class="skill-name">${escapeHtml(s.name)}</h3>
      <p class="skill-desc">${escapeHtml(s.shortDescription)}</p>
    </article>
  `
    )
    .join('');
}

// Render projects from JSON into #projects-grid; add data-tags for filtering
async function renderProjects() {
  const grid = document.getElementById('projects-grid');
  const filterContainer = document.getElementById('project-filters');
  if (!grid) return;
  const data = await import('./data/projects.json');
  const projects = data.default;

  const allTags = new Set();
  projects.forEach((p) => (p.tags || []).forEach((t) => allTags.add(t)));

  grid.innerHTML = projects
    .map((p) => {
      const tags = p.tags || [];
      const dataTags = tags.map((t) => escapeAttr(t.toLowerCase())).join(' ');
      return `
    <article class="project-card" data-animate data-tags="${dataTags}">
      <div class="project-image">${p.image ? `<img src="${escapeAttr(p.image)}" alt="${escapeAttr(p.title)}" loading="lazy" />` : '<div class="project-placeholder"></div>'}</div>
      <div class="project-body">
        <h3 class="project-title">${escapeHtml(p.title)}</h3>
        <p class="project-desc">${escapeHtml(p.description)}</p>
        <div class="project-tags">${tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>
        <div class="project-links">
          ${p.liveUrl ? `<a href="${escapeAttr(p.liveUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-small">Live</a>` : ''}
          ${p.repoUrl ? `<a href="${escapeAttr(p.repoUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-small btn-outline">Code</a>` : ''}
        </div>
      </div>
    </article>
  `;
    })
    .join('');

  if (filterContainer && allTags.size > 0) {
    const sortedTags = [...allTags].sort();
    filterContainer.innerHTML =
      `<button type="button" class="filter-btn active" data-filter="all">All</button>` +
      sortedTags.map((t) => `<button type="button" class="filter-btn" data-filter="${escapeAttr(t.toLowerCase())}">${escapeHtml(t)}</button>`).join('');
    filterContainer.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        filterContainer.querySelectorAll('.filter-btn').forEach((b) => b.classList.toggle('active', b.getAttribute('data-filter') === filter));
        grid.querySelectorAll('.project-card').forEach((card) => {
          const tags = (card.getAttribute('data-tags') || '').split(/\s+/).filter(Boolean);
          const show = filter === 'all' || tags.includes(filter);
          card.classList.toggle('is-hidden', !show);
        });
      });
    });
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Back to top: show after scroll, scroll to top on click
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  const showAfter = 400;
  function update() {
    btn.classList.toggle('is-visible', window.scrollY > showAfter);
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

(async function init() {
  initTheme();
  initStickFigure();
  await Promise.all([renderSkills(), renderProjects()]);
  initNav();
  initAnimations();
  initHero();
  initBackToTop();
})();
