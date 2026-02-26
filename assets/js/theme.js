// assets/js/theme.js
(function () {
  const STORAGE_KEY = "toolindex_theme"; // "light" | "dark"

  function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.toggleAttribute("data-theme", isDark);
    if (isDark) document.body.setAttribute("data-theme", "dark");
    else document.body.removeAttribute("data-theme");

    // Update any toggle buttons
    const btns = document.querySelectorAll("[data-theme-toggle]");
    btns.forEach((btn) => {
      btn.setAttribute("aria-pressed", String(isDark));
      btn.textContent = isDark ? "☀️" : "🌙";
      btn.title = isDark ? "Light Mode" : "Dark Mode";
    });
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;

    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    return prefersDark ? "dark" : "light";
  }

  function toggleTheme() {
    const current = document.body.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  // Apply as early as possible
  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(getPreferredTheme());

    document.addEventListener("click", (e) => {
      const el = e.target.closest?.("[data-theme-toggle]");
      if (!el) return;
      toggleTheme();
    });
  });

  // Optional: expose for debugging
  window.ToolIndexTheme = { toggleTheme, applyTheme };
})();