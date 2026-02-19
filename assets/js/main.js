// assets/js/main.js
(() => {
  const HEADER_HTML = `
<header class="site-header" data-ti-header>
  <div class="container header-inner">
    <a class="brand" href="/" aria-label="ToolIndex Home">
      <img src="/assets/img/logo.svg" alt="ToolIndex" class="brand-logo" />
      <span class="brand-text">ToolIndex</span>
    </a>

    <!-- ZONE 1: Ankerlinks (Startseite) -->
    <nav class="nav nav-anchors" aria-label="Seitenabschnitte">
      <a href="/#top10" data-anchor="top10">Top 10</a>
      <a href="/#faq" data-anchor="faq">FAQ</a>
    </nav>

    <!-- ZONE 2: Unterseiten (Dropdown) -->
    <div class="nav-pages" aria-label="Unterseiten">
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-pages-menu">
        Seiten <span aria-hidden="true">▾</span>
      </button>

      <div class="nav-menu" id="nav-pages-menu" role="menu">
        <a role="menuitem" href="/" data-page="home">Home</a>
        <a role="menuitem" href="/vergleich/" data-page="vergleich">Vergleich</a>
        <a role="menuitem" href="/reviews/" data-page="reviews">Reviews</a>
        <a role="menuitem" href="/kategorien/" data-page="kategorien">Kategorien</a>
        <div class="nav-sep" aria-hidden="true"></div>
        <a role="menuitem" href="/affiliate-offenlegung/" data-page="affiliate">Affiliate</a>
        <a role="menuitem" href="/impressum/" data-page="impressum">Impressum</a>
        <a role="menuitem" href="/datenschutz/" data-page="datenschutz">Datenschutz</a>
      </div>
    </div>
  </div>
</header>
`;

  function injectHeader() {
    // Wenn schon vorhanden: nix tun
    if (document.querySelector("[data-ti-header]")) return;

    // Falls Seiten noch eigenen Header enthalten: entfernen
    const existing = document.querySelector("header.site-header");
    if (existing) existing.remove();

    document.body.insertAdjacentHTML("afterbegin", HEADER_HTML);
  }

  function setActiveLink() {
    const path = location.pathname.replace(/\/+$/, "") || "/";
    const menu = document.querySelector("#nav-pages-menu");
    if (!menu) return;

    // reset
    menu.querySelectorAll("a[role='menuitem']").forEach(a => a.classList.remove("active"));

    const map = [
      { key: "home", match: /^\/$/ },
      { key: "vergleich", match: /^\/vergleich$/ },
      { key: "reviews", match: /^\/reviews$/ },
      { key: "kategorien", match: /^\/kategorien$/ },
      { key: "affiliate", match: /^\/affiliate-offenlegung$/ },
      { key: "impressum", match: /^\/impressum$/ },
      { key: "datenschutz", match: /^\/datenschutz$/ },
    ];

    const hit = map.find(m => m.match.test(path));
    if (!hit) return;

    const active = menu.querySelector(`a[data-page="${hit.key}"]`);
    if (active) active.classList.add("active");
  }

  function wireDropdown() {
    const btn = document.querySelector(".nav-toggle");
    const menu = document.querySelector(".nav-menu");
    if (!btn || !menu) return;

    const close = () => {
      btn.setAttribute("aria-expanded", "false");
      menu.classList.remove("open");
    };

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("open", !open);
    });

    document.addEventListener("click", close);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  function normalizeAnchorScroll() {
    // Wenn du auf /#faq klickst, landet man korrekt, selbst wenn man schon auf einer Unterseite war.
    // Browser macht das sowieso, aber wir lassen es drin für spätere Smooth-Scroll Erweiterung.
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectHeader();
    setActiveLink();
    wireDropdown();
    normalizeAnchorScroll();
  });
})();