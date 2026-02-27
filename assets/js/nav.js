// assets/js/nav.js
// Global: active nav highlighting + safe handling of hash-links on subpages.
// Runs once immediately and again after components (header/footer) were injected.

(function () {
  function run() {
    try {
      var path = (location.pathname || "/").toLowerCase();

      // Map current path to nav key
      var navKey =
        path === "/" ? "home" :
        path.startsWith("/vergleich") ? "vergleich" :
        path.startsWith("/reviews") ? "reviews" :
        path.startsWith("/kategorien") ? "kategorien" :
        null;

      // Mark active item
      if (navKey) {
        var el = document.querySelector('.nav a[data-nav="' + navKey + '"]');
        if (el) {
          el.classList.add("active");
          el.setAttribute("aria-current", "page");
        }
      }

      // If we are NOT on home, make Top10/FAQ go to home anchors
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

  run();
  document.addEventListener("components:loaded", run);
})();