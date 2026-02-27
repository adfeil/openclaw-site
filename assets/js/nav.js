// assets/js/nav.js
// Global: active nav highlighting + safe handling of hash-links on subpages.
// Works with injected header via components.js (waits for components:loaded if needed).

function applyNav() {
  try {
    var path = (location.pathname || "/").toLowerCase();

    // Active state only for current primary nav items
    var navKey =
      path === "/" ? "home" :
      path.startsWith("/kategorien") ? "kategorien" :
      null;

    if (navKey) {
      var el = document.querySelector('.nav a[data-nav="' + navKey + '"]');
      if (el) {
        el.classList.add("active");
        el.setAttribute("aria-current", "page");
      }
    }

    // Ensure Top10/FAQ always point to home anchors from subpages
    var isHome = path === "/";
    if (!isHome) {
      var top10 = document.querySelector('.nav a[data-nav="top10"]');
      var faq = document.querySelector('.nav a[data-nav="faq"]');
      if (top10) top10.setAttribute("href", "/#top10");
      if (faq) faq.setAttribute("href", "/#faq");
    }
  } catch (e) {
    // no-op
  }
}

(function () {
  // If header is already present, run now
  if (document.querySelector(".nav")) {
    applyNav();
    return;
  }
  // Otherwise wait for injected components
  document.addEventListener("components:loaded", applyNav);
})();