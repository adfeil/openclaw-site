(() => {
  const norm = (p) => {
    // normalize pathname: ensure leading slash and trailing slash for dirs
    if (!p) return "/";
    try {
      p = new URL(p, window.location.origin).pathname;
    } catch (_) {}
    if (!p.startsWith("/")) p = "/" + p;
    // treat /index.html as /
    if (p.endsWith("/index.html")) p = p.replace(/\/index\.html$/, "/");
    // ensure trailing slash for directory-like paths
    if (!p.includes(".") && !p.endsWith("/")) p += "/";
    return p;
  };

  const currentPath = norm(window.location.pathname);
  const currentHash = window.location.hash || "";

  const links = document.querySelectorAll(".nav a");
  links.forEach((a) => a.classList.remove("active"));

  // 1) match by pathname for real pages
  for (const a of links) {
    const href = a.getAttribute("href") || "";
    // ignore pure hash links in this pass
    if (href.startsWith("#")) continue;

    const aPath = norm(a.href);
    if (aPath === currentPath) {
      a.classList.add("active");
      return;
    }
  }

  // 2) if we're on homepage, highlight Top10/FAQ when hash matches
  if (currentPath === "/" && (currentHash === "#top10" || currentHash === "#faq")) {
    for (const a of links) {
      const href = a.getAttribute("href") || "";
      if (href === "/#top10" && currentHash === "#top10") a.classList.add("active");
      if (href === "/#faq" && currentHash === "#faq") a.classList.add("active");
      if (href === "#top10" && currentHash === "#top10") a.classList.add("active");
      if (href === "#faq" && currentHash === "#faq") a.classList.add("active");
    }
  }
})();
