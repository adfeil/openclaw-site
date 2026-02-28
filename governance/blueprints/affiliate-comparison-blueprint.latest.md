# AFFILIATE COMPARISON BLUEPRINT – V2.3
Machine-Readable · Repo-Safe · Bot-Safe
Owner: Adrian
Project: tool-index.com

---

# ⚠️ BLUEPRINT IS READ-ONLY

THIS FILE IS READ-ONLY.

The bot may READ this file.
The bot may NEVER modify this file.
The bot may NEVER overwrite this file.
The bot may NEVER append to this file.

This file defines structure and output contract only.

---

# 🎯 PURPOSE

Generate a high-converting comparison page inside the existing ToolIndex system that:

- ranks organically
- builds trust
- drives affiliate clicks
- respects repository boundaries
- uses global components
- follows strict structural rules

Primary Goal: Affiliate Revenue
Secondary Goal: SEO Authority

---

# 📁 PATH CONTRACT (MANDATORY)

Comparison pages MUST be created in:

/vergleich/<slug>/index.html

Rules:

- <slug> lowercase only
- words separated by hyphens
- no special characters
- no uppercase letters
- no spaces
- no trailing slash inside slug

Example:

/vergleich/beste-terminbuchungssoftware/

If folder does not exist → create it.

The bot may ONLY write inside:

/vergleich/<slug>/

The bot must NEVER:

- modify homepage (/index.html)
- modify /kategorien/
- modify /tools/
- modify /reviews/
- modify governance folder
- modify blueprint files
- modify global assets
- modify other vergleich folders

If any file outside /vergleich/<slug>/ is touched → ABORT.

---

# 🧩 SYSTEM INTEGRATION (MANDATORY)

All comparison pages MUST use global components.

Required at top of body:

<div data-component="header"></div>

Required before closing body:

<div data-component="footer"></div>

Required scripts before </body>:

<script src="/assets/js/theme.js" defer></script>
<script src="/assets/js/components.js" defer></script>
<script src="/assets/js/nav.js" defer></script>

The page MUST use:

<link rel="stylesheet" href="/assets/css/main.css" />

Custom per-page CSS files (e.g. /vergleich/<slug>/styles.css) are NOT required by default.
Only allowed if absolutely necessary for a unique layout.
If used: keep minimal and justified. Prefer global styles.

---

# 📦 OUTPUT CONTRACT (STRICT)

The bot MUST:

- Fully overwrite /vergleich/<slug>/index.html
- Generate production-ready HTML
- Generate complete content
- Use semantic structure
- Use clean indentation
- Not append to existing files
- Not generate duplicate versions

No placeholders.
No TODO comments.
No “example text”.
No unfinished sections.

---

# 🧱 STRUCTURE ENFORCEMENT (ORDER MUST NOT CHANGE)

Every comparison page MUST follow this order:

1. HERO SECTION
2. TRUST STRIP
3. SEO INTRO CONTENT
4. QUICK RECOMMENDATION (TOP 3)
5. FULL COMPARISON TABLE (with score)
6. MINI REVIEWS (OPTIONAL, Phase 2)
7. EDITOR RECOMMENDATION
8. FAQ SECTION
9. INTERNAL LINKS BLOCK

Footer is injected globally.

No reordering allowed.
No additional structural sections allowed between them.

---

# 🧩 SECTION SPECIFICATIONS

---

## 1️⃣ HERO SECTION

Must include:

- Exactly one H1 (only H1 on entire page)
- Benefit-driven headline
- Outcome-focused lead paragraph
- Primary CTA button to #vergleich
- Secondary CTA to #quick-reco
- Light design (no dark default)

CTA:

- Uses class "btn primary"
- Clear action language

---

## 2️⃣ TRUST STRIP

Position: directly below hero.

Must include:

- “Vergleich <Jahr>” badge
- Number of tools analyzed
- Update month/year

Compact horizontal layout.

---

## 3️⃣ SEO INTRO CONTENT

Length: 300–800 words.

Must include:

- Primary keyword naturally
- Decision criteria
- Use cases
- Neutral tone (no hype)
- No fake claims

---

## 4️⃣ QUICK RECOMMENDATION (TOP 3)

Format: 3 cards in grid layout.

- Section id MUST be: #quick-reco
- Cards MUST use existing .card styling
- Prefer classes for hierarchy if available:
  - .quick-top3, .quick-card, .quick-head, .quick-score, .quick-cta (optional)

Each card includes:

- Use case label (e.g. “Allround”, “Agentur”, “Einfach”)
- Tool name
- Short reasoning (2–3 lines)
- CTA button (btn primary) to affiliate link

NOTE:
This block represents the current best picks (Top 3).
Ranking labels like “#1/#2/#3” should only be used if the scoring supports it.
Default: use non-ranking labels (Allround/Agentur/Einfach).

---

## 5️⃣ FULL COMPARISON TABLE (WITH SCORE)

Section id MUST be: #vergleich

Columns required (NO separate CTA column):

- Tool (includes CTA button)
- Preis
- Kostenloser Plan
- Integrationen
- Bedienbarkeit
- API
- DSGVO
- Hosting

Rules:

- Must be responsive
- Horizontal scroll allowed on smaller screens (do not destroy words/buttons)
- No fake ratings
- No invented statistics
- CTA button MUST be inside Tool cell (first column)

Score badge REQUIRED inside Tool cell:

Required markup pattern (per row):

<td class="tool-cell">
  <div class="tool-meta">
    <div class="tool-name">ToolName</div>
    <div class="tool-score" data-score="87">
      <span class="score-value">87</span><span class="score-max">/100</span>
    </div>
  </div>
  <a class="btn primary btn-sm" href="AFFILIATE_URL" target="_blank" rel="nofollow sponsored noopener">Tool testen</a>
</td>

Scores must be consistent across page sections (Quick block + Table).

---

## 6️⃣ MINI REVIEWS (OPTIONAL, PHASE 2)

This section may be included if needed.
If included:

- One block per tool
- Tool name headline (H2 or H3 depending on page hierarchy; do not introduce extra H1)
- “Ideal für”
- Pros list
- Cons list
- CTA button

No fake testimonials.
No fabricated claims.

If omitted:
Do NOT break structure. Still continue with Editor Recommendation as next section.

---

## 7️⃣ EDITOR EMPFEHLUNG

Must include:

- Clear reasoning
- Defined target audience
- Emphasized box
- Strong CTA

---

## 8️⃣ FAQ SECTION

5–8 questions.

Must include:

- Preisfragen
- DSGVO-Fragen
- Vergleichsfragen
- Anfänger-Eignung

Use H3 for questions.

---

## 9️⃣ INTERNAL LINKS BLOCK

Include:

- 3–5 relevante Vergleichsseiten
- 2–3 relevante Review-Seiten
- Anchortext must be contextual

No generic “hier klicken”.

---

# 🎨 DESIGN SYSTEM

Must follow:

- assets/css/main.css
- Existing button classes
- Existing card classes
- Existing container width

No external CSS frameworks.

Allowed accent colors:

- #2563EB
- #1D4ED8
- #3B82F6

---

# 💰 MONETIZATION RULES

Must include:

- CTA above fold
- CTA in quick block
- CTA in table rows (inside Tool cell)
- CTA in editor recommendation
- Visible buttons (no hidden CTA columns)

No aggressive popups.
No fake urgency.
No misleading tactics.

---

# 🚫 STRICT PROHIBITIONS

The bot must NOT:

- invent user reviews
- fabricate statistics
- fabricate ratings
- copy competitor content
- modify this blueprint
- modify global structure
- modify navigation

---

# ✅ DEFINITION OF DONE

Page is complete when:

- Structure strictly followed
- Located inside /vergleich/<slug>/
- Responsive
- SEO-ready
- Affiliate-ready
- No placeholders
- No broken links

Only then suggest deployment.

---

# 🔵 END OF BLUEPRINT V2.3