// assets/js/theme.js
// Global theme (default LIGHT). Supports dynamic injected toggle button.

(function () {
  const STORAGE_KEY = "toolindex_theme";

  function setTheme(theme) {
    if (theme === "dark") {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.removeAttribute("data-theme"); // light default
    }
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
    updateToggle(theme);
  }

  function getStoredTheme() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function detectDefaultTheme() {
    // Default is light, unless user previously chose dark
    return "light";
  }

  function updateToggle(theme) {
    const btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;

    const isDark = theme === "dark";
    btn.setAttribute("aria-pressed", String(isDark));
    btn.title = isDark ? "Light Mode" : "Dark Mode";
    btn.textContent = isDark ? "☀️" : "🌙";
  }

  // init early
  const stored = getStoredTheme();
  const initial = stored || detectDefaultTheme();
  setTheme(initial);

  // event delegation: works even if button is injected later
  document.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-theme-toggle]");
    if (!btn) return;

    const current = document.body.getAttribute("data-theme") === "dark" ? "dark" : "light";
    setTheme(current === "dark" ? "light" : "dark");
  });

  // after components injected, update button state
  document.addEventListener("components:loaded", function () {
    const current = document.body.getAttribute("data-theme") === "dark" ? "dark" : "light";
    updateToggle(current);
  });
})();