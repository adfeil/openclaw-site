// assets/js/components.js
// Injects global header/footer HTML into placeholders on every page.
// After injection, re-apply current theme so newly injected toggle buttons are initialized.

(async function () {
  try {
    const headerMount = document.querySelector('[data-component="header"]');
    const footerMount = document.querySelector('[data-component="footer"]');

    async function inject(url, mount) {
      if (!mount) return;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return;
      mount.innerHTML = await res.text();
    }

    await Promise.all([
      inject("/components/header.html", headerMount),
      inject("/components/footer.html", footerMount),
    ]);

    // IMPORTANT: header/footer are injected after theme.js already ran.
    // Re-apply current theme to update any newly added [data-theme-toggle] buttons.
    try {
      const current = document.body.getAttribute("data-theme") === "dark" ? "dark" : "light";
      if (window.ToolIndexTheme && typeof window.ToolIndexTheme.applyTheme === "function") {
        window.ToolIndexTheme.applyTheme(current);
      }
    } catch (e) {}

    document.dispatchEvent(new CustomEvent("components:loaded"));
  } catch (e) {
    // no-op
  }
})();