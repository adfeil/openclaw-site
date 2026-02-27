// assets/js/components.js
// Injects global header/footer HTML into placeholders on every page.

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

    document.dispatchEvent(new CustomEvent("components:loaded"));
  } catch (e) {
    // no-op
  }
})();