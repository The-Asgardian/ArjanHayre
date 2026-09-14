import './style.css';
import projects from './data/projects.json';

const projectIndex = document.querySelector('#project-index');
const projectCount = document.querySelector('#project-count');
const header = document.querySelector('[data-header]');

function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}

function projectLinks(project) {
  if (!project.repoUrl) return '';
  return `<a class="project-link" href="${escapeHtml(project.repoUrl)}" target="_blank" rel="noopener">Repository -></a>`;
}

function renderProject(project, index) {
  return `
    <article class="project-card">
      <div class="project-card-header">
        <div class="project-card-number">${String(index + 1).padStart(2, '0')}</div>
        <div>
          <p class="project-card-category">${escapeHtml(project.category)} / ${escapeHtml(project.period)}</p>
          <h3>${escapeHtml(project.title)}</h3>
        </div>
        ${projectLinks(project)}
      </div>
      <div class="project-card-grid">
        <div class="project-block">
          <span class="project-label">Goal</span>
          <p>${escapeHtml(project.goal)}</p>
        </div>
        <div class="project-block">
          <span class="project-label">Action</span>
          <p>${escapeHtml(project.action)}</p>
        </div>
        <div class="project-block project-result">
          <span class="project-label">Result</span>
          <p>${escapeHtml(project.result)}</p>
        </div>
      </div>
      <div class="project-stack">
        <span class="project-label">Tech stack</span>
        <div class="project-tags">${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
      </div>
    </article>`;
}

projectCount.textContent = `${String(projects.length).padStart(2, '0')} projects`;
projectIndex.innerHTML = projects.map(renderProject).join('');

document.querySelector('#year').textContent = new Date().getFullYear();
window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 16), { passive: true });
