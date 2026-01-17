const STORAGE_KEY = 'portfolio-theme';

function setTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (err) {
    // Ignore storage errors (private mode, etc.)
  }
}

function getInitialTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch (err) {
    // Ignore storage errors
  }

  const prefersLight =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: light)').matches;
  return prefersLight ? 'light' : 'dark';
}

function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  let theme = getInitialTheme();
  setTheme(theme);

  toggle.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
  });
}

function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const drawer = document.getElementById('nav-drawer');
  if (!toggle || !drawer) return;

  function closeDrawer() {
    drawer.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    const isOpen = !drawer.hidden;
    drawer.hidden = isOpen;
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  drawer.addEventListener('click', (event) => {
    if (event.target && event.target.tagName === 'A') {
      closeDrawer();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 680) closeDrawer();
  });
}

function initYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = 'Thanks! This template does not send emails yet.';

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      setTimeout(() => {
        submitButton.disabled = false;
      }, 900);
    }
  });
}

initThemeToggle();
initMobileNav();
initYear();
initContactForm();

