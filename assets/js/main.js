// assets/js/main.js
(function () {
  function normPath(p) {
    if (!p) return "/";
    // remove query/hash
    p = p.split("?")[0].split("#")[0];
    // normalize trailing slash (except root)
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    return p || "/";
  }

  function getHeaderOffset() {
    const header = document.querySelector(".site-header");
    if (!header) return 0;
    const h = header.getBoundingClientRect().height || 0;
    return Math.round(h + 10); // 10px Luft
  }

  function scrollToHash(hash, behavior) {
    if (!hash) return false;
    const id = hash.replace("#", "");
    if (!id) return false;

    const el = document.getElementById(id);
    if (!el) return false;

    const offset = getHeaderOffset();
    const y = window.scrollY + el.getBoundingClientRect().top - offset;

    window.scrollTo({
      top: Math.max(0, y),
      behavior: behavior || "smooth",
    });

    return true;
  }

  function setActiveNav() {
    const links = Array.from(document.querySelectorAll(".nav a"));
    if (!links.length) return;

    const currentPath = normPath(window.location.pathname);
    const currentHash = window.location.hash || "";

    links.forEach((a) => a.classList.remove("active"));

    // 1) Hash-Links auf Home priorisieren, wenn wir wirklich auf "/" sind
    if (currentPath === "/" && currentHash) {
      const hashLink = links.find((a) => {
        const href = a.getAttribute("href") || "";
        return href === currentHash || href === "/"+currentHash;
      });
      if (hashLink) {
        hashLink.classList.add("active");
        return;
      }
    }

    // 2) Normale Seiten-Nav anhand Path matchen
    const match = links.find((a) => {
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("/")) return false;

      const hrefPath = normPath(href);
      // Home-Link
      if (hrefPath === "/" && currentPath === "/") return true;

      return hrefPath === currentPath;
    });

    if (match) match.classList.add("active");
  }

  function bindAnchorClicks() {
    document.addEventListener("click", (e) => {
      const a = e.target && e.target.closest ? e.target.closest("a") : null;
      if (!a) return;

      const href = a.getAttribute("href") || "";
      if (!href.includes("#")) return;

      // Nur interne Links behandeln
      const isAbsolute = /^https?:\/\//i.test(href);
      if (isAbsolute) return;

      // Fälle:
      //  - "#top10" (same page)
      //  - "/#top10" (home section)
      //  - "/vergleich/#..." (später)
      const parts = href.split("#");
      const pathPart = parts[0] || "";
      const hashPart = "#" + (parts[1] || "");
      const targetPath = normPath(pathPart || window.location.pathname);

      const currentPath = normPath(window.location.pathname);

      // Wenn Ziel-Seite == aktuelle Seite → smooth scroll
      if (targetPath === currentPath) {
        e.preventDefault();
        if (scrollToHash(hashPart, "smooth")) {
          history.pushState(null, "", hashPart);
          setActiveNav();
        }
        return;
      }

      // Wenn Ziel = Home und wir sind NICHT auf Home → normal navigieren (Browser macht dann den Hash)
      // (kein preventDefault)
    });
  }

  function bindScrollSpyHome() {
    const currentPath = normPath(window.location.pathname);
    if (currentPath !== "/") return;

    const top10 = document.getElementById("top10");
    const faq = document.getElementById("faq");
    if (!top10 && !faq) return;

    let ticking = false;

    function update() {
      ticking = false;

      const offset = getHeaderOffset();
      const y = window.scrollY + offset + 1;

      const sections = [
        { id: "top10", el: top10 },
        { id: "faq", el: faq },
      ].filter((s) => s.el);

      // finde "aktuelle" section = letzte, deren top <= y
      let activeId = "";
      for (const s of sections) {
        const top = s.el.getBoundingClientRect().top + window.scrollY;
        if (top <= y) activeId = s.id;
      }

      if (activeId) {
        // aktive Nav setzen auf /#ID
        const links = Array.from(document.querySelectorAll(".nav a"));
        links.forEach((a) => a.classList.remove("active"));
        const l = links.find((a) => (a.getAttribute("href") || "") === "/#" + activeId);
        if (l) l.classList.add("active");
      } else {
        // sonst Home aktiv lassen
        setActiveNav();
      }
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    });

    // initial
    update();
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindAnchorClicks();

    // Wenn direkt mit Hash geladen wurde → nach Layout kurz scrollen
    if (window.location.hash) {
      setTimeout(() => {
        scrollToHash(window.location.hash, "auto");
        setActiveNav();
      }, 50);
    } else {
      setActiveNav();
    }

    bindScrollSpyHome();

    // Aktiv-Nav auch bei Back/Forward korrekt halten
    window.addEventListener("popstate", () => setActiveNav());
  });
})();