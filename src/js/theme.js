/**
 * Light/dark theme toggle. Persists preference in localStorage.
 */
const STORAGE_KEY = 'portfolio-theme';
const ATTR = 'data-theme';

function getStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'dark';
  } catch {
    return 'dark';
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute(ATTR, theme === 'light' ? 'light' : '');
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {}
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = theme === 'light' ? 'Dark' : 'Light';
}

function initTheme() {
  const theme = getStoredTheme();
  setTheme(theme);

  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute(ATTR);
      setTheme(current === 'light' ? 'dark' : 'light');
    });
  }
}

export { initTheme, setTheme, getStoredTheme };
