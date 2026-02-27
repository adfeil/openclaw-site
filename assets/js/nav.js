// assets/js/nav.js
// Global: active nav highlighting + safe handling of hash-links on subpages.

function applyNav() {
  try {
    var path = (location.pathname || "/").toLowerCase();

    var navKey =
      path === "/" ? "home" :
      path.startsWith("/vergleich") ? "vergleich" :
      path.startsWith("/reviews") ? "reviews" :
      path.startsWith("/kategorien") ? "kategorien" :
      null;

    if (navKey) {
      var el = document.querySelector('.nav a[data-nav="' + navKey + '"]');
      if (el) {
        el.classList.add("active");
        el.setAttribute("aria-current", "page");
      }
    }

    var isHome = path === "/";
    if (!isHome) {
      var top10 = document.querySelector('.nav a[data-nav="top10"]');
      var faq = document.querySelector('.nav a[data-nav="faq"]');
      if (top10) top10.setAttribute("href", "/#top10");
      if (faq) faq.setAttribute("href", "/#faq");
    }
  } catch (e) {}
}

(function () {
  // If header is already there, run now.
  if (document.querySelector(".nav")) {
    applyNav();
    return;
  }
  // Otherwise wait for injected components.
  document.addEventListener("components:loaded", applyNav);
})();