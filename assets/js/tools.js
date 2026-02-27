// assets/js/tools.js
// Simple A–Z render + client-side search (no backend).

(function () {
  function normalize(s) {
    return String(s || "")
      .toLowerCase()
      .trim();
  }

  // Seed list (wir erweitern später systematisch)
  // href zeigt erstmal auf die sinnvollste Kategorie/Seite, nicht auf “perfekte” Tool-Detailseiten.
  var TOOLS = [
    // KI-Chat & Assistenten
    { name: "ChatGPT", href: "/kategorien/ki-chat-assistenten/", tags: ["chat", "assistant", "llm", "openai"] },
    { name: "Claude", href: "/kategorien/ki-chat-assistenten/", tags: ["chat", "assistant", "llm", "anthropic"] },
    { name: "Gemini", href: "/kategorien/ki-chat-assistenten/", tags: ["chat", "assistant", "llm", "google"] },
    { name: "Perplexity", href: "/kategorien/ki-chat-assistenten/", tags: ["search", "research", "assistant"] },

    // Automatisierung & Agenten
    { name: "Zapier", href: "/kategorien/automatisierung-agenten/", tags: ["automation", "integrations"] },
    { name: "Make", href: "/kategorien/automatisierung-agenten/", tags: ["automation", "integrations"] },
    { name: "n8n", href: "/kategorien/automatisierung-agenten/", tags: ["automation", "workflows", "self-hosted"] },
    { name: "Pipedream", href: "/kategorien/automatisierung-agenten/", tags: ["automation", "dev", "workflows"] },

    // Content & Copywriting
    { name: "Jasper", href: "/kategorien/content-copywriting/", tags: ["copywriting", "marketing", "content"] },
    { name: "Copy.ai", href: "/kategorien/content-copywriting/", tags: ["copywriting", "content"] },
    { name: "Writesonic", href: "/kategorien/content-copywriting/", tags: ["copywriting", "seo", "content"] },
    { name: "Neuroflash", href: "/kategorien/content-copywriting/", tags: ["copywriting", "de", "content"] },
    { name: "Notion AI", href: "/kategorien/produktivitaet-notizen/", tags: ["notes", "productivity", "writing"] },

    // Design & Creative
    { name: "Canva", href: "/kategorien/design-creative/", tags: ["design", "creative"] },
    { name: "Adobe Express", href: "/kategorien/design-creative/", tags: ["design", "creative"] },
    { name: "Midjourney", href: "/kategorien/design-creative/", tags: ["image", "creative"] },

    // Video & Audio
    { name: "Descript", href: "/kategorien/video-audio/", tags: ["video", "audio", "editing"] },
    { name: "Runway", href: "/kategorien/video-audio/", tags: ["video", "generative"] },
    { name: "CapCut", href: "/kategorien/video-audio/", tags: ["video", "editing"] },

    // Produktivität & Notizen
    { name: "Notion", href: "/kategorien/produktivitaet-notizen/", tags: ["notes", "wiki", "productivity"] },
    { name: "Obsidian", href: "/kategorien/produktivitaet-notizen/", tags: ["notes", "knowledge"] },
    { name: "ClickUp", href: "/kategorien/produktivitaet-notizen/", tags: ["tasks", "project"] },

    // Website & Landingpage Builder
    { name: "Webflow", href: "/kategorien/website-landingpage-builder/", tags: ["website", "builder"] },
    { name: "Framer", href: "/kategorien/website-landingpage-builder/", tags: ["website", "builder"] },
    { name: "Wix", href: "/kategorien/website-landingpage-builder/", tags: ["website", "builder"] },
    { name: "Squarespace", href: "/kategorien/website-landingpage-builder/", tags: ["website", "builder"] },

    // Security & Passwort-Manager
    { name: "Bitwarden", href: "/kategorien/security-passwort-manager/", tags: ["security", "passwords"] },
    { name: "1Password", href: "/kategorien/security-passwort-manager/", tags: ["security", "passwords"] },
    { name: "Dashlane", href: "/kategorien/security-passwort-manager/", tags: ["security", "passwords"] },
  ];

  function groupByLetter(items) {
    var map = {};
    items.forEach(function (t) {
      var letter = (t.name || "#").trim().charAt(0).toUpperCase();
      if (!letter.match(/[A-Z]/)) letter = "#";
      if (!map[letter]) map[letter] = [];
      map[letter].push(t);
    });

    // sort letters A-Z with # last
    var letters = Object.keys(map).sort(function (a, b) {
      if (a === "#") return 1;
      if (b === "#") return -1;
      return a.localeCompare(b);
    });

    // sort tools in each letter
    letters.forEach(function (l) {
      map[l].sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    });

    return { letters: letters, map: map };
  }

  function render(items) {
    var mount = document.getElementById("azMount");
    var noResults = document.getElementById("noResults");
    if (!mount) return;

    mount.innerHTML = "";

    if (!items || items.length === 0) {
      if (noResults) noResults.style.display = "block";
      return;
    }
    if (noResults) noResults.style.display = "none";

    var grouped = groupByLetter(items);

    grouped.letters.forEach(function (letter) {
      var card = document.createElement("div");
      card.className = "az-card";

      var h = document.createElement("h2");
      h.className = "az-letter";
      h.textContent = letter;
      card.appendChild(h);

      var ul = document.createElement("ul");
      ul.className = "az-list";

      grouped.map[letter].forEach(function (t) {
        var li = document.createElement("li");
        li.className = "az-item";

        var a = document.createElement("a");
        a.href = t.href || "/kategorien/";
        a.innerHTML =
          '<span><strong>' +
          escapeHtml(t.name) +
          "</strong></span>" +
          '<small>→ öffnen</small>';

        li.appendChild(a);
        ul.appendChild(li);
      });

      card.appendChild(ul);
      mount.appendChild(card);
    });
  }

  function escapeHtml(s) {
    return String(s || "").replace(/[&<>"']/g, function (ch) {
      return ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      })[ch];
    });
  }

  function filterTools(q) {
    q = normalize(q);
    if (!q) return TOOLS.slice();

    return TOOLS.filter(function (t) {
      var hay = [
        t.name,
        (t.tags || []).join(" "),
      ].join(" ");
      return normalize(hay).indexOf(q) !== -1;
    });
  }

  function init() {
    var input = document.getElementById("toolSearch");
    render(TOOLS);

    if (!input) return;

    input.addEventListener("input", function () {
      var q = input.value || "";
      render(filterTools(q));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();