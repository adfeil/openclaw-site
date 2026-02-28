// assets/js/nav.js
// Active nav highlighting + safe handling of hash-links on subpages.
// Also sets dynamic --header-h CSS variable for fixed header spacing.

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
      // silent fail
    }
  }

  // --- header height -> CSS var (for fixed header spacing) ---
  function setHeaderHeight() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    var height = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--header-h", height + "px");
  }

  // Run immediately
  run();

  // Run again after header/footer injected
  document.addEventListener("components:loaded", function () {
    run();
    setHeaderHeight();
  });

  // Initial header height setup
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setHeaderHeight, { once: true });
  } else {
    setHeaderHeight();
  }

  // Update on resize
  window.addEventListener("resize", setHeaderHeight, { passive: true });

})();