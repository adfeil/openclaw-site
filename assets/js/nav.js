// assets/js/nav.js
// Active nav highlighting + safe handling of hash-links on subpages.
// Runs once immediately and again after components (header/footer) were injected.

(function () {
  function run() {
    try {
      var path = (location.pathname || "/").toLowerCase();

      // Map current path to nav key
      var navKey =
        path === "/" ? "home" :
        path.startsWith("/kategorien") ? "kategorien" :
        path.startsWith("/tools") ? "tools" :
        path.startsWith("/vergleich") ? "vergleich" :
        path.startsWith("/reviews") ? "reviews" :
        null;

      // Mark active item
      if (navKey) {
        var el = document.querySelector('.nav a[data-nav="' + navKey + '"]');
        if (el) {
          el.classList.add("active");
          el.setAttribute("aria-current", "page");
        }
      }

      // If we are NOT on home, make FAQ go to home anchor
      var isHome = path === "/";
      if (!isHome) {
        var faq = document.querySelector('.nav a[data-nav="faq"]');
        if (faq) faq.setAttribute("href", "/#faq");
      }
    } catch (e) {
      // no-op
    }
  }

  run();
  document.addEventListener("components:loaded", run);
})();