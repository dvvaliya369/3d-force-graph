(function () {
  var KEY = 'bb-theme';

  function setTheme(theme) {
    var root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark');
    localStorage.setItem(KEY, theme === 'light' ? 'light' : 'dark');
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'light' ? 'Dark' : 'Light';
  }

  function getTheme() {
    var saved = localStorage.getItem(KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark';
  }

  function toggleTheme() {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  }

  document.addEventListener('DOMContentLoaded', function () {
    setTheme(getTheme());
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', toggleTheme);
  });
})();
