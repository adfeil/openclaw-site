# AFFILIATE COMPARISON BLUEPRINT – V2.2
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

No custom CSS file is required by default.
Inline style blocks are allowed only if minimal and justified.

---

# 📦 OUTPUT CONTRACT (STRICT)

The bot MUST:

- Fully overwrite index.html
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
4. QUICK RECOMMENDATION BLOCK  
5. FULL COMPARISON TABLE  
6. MINI REVIEWS (per tool)  
7. EDITOR RECOMMENDATION  
8. FAQ SECTION  
9. INTERNAL LINKS BLOCK  

Footer is injected globally.

No sections may be removed.
No reordering allowed.
No additional structural sections allowed between them.

---

# 🧩 SECTION SPECIFICATIONS

---

## 1️⃣ HERO SECTION

Must include:

- Exactly one H1 (only H1 on entire page)
- Benefit-driven headline
- Outcome-focused subheadline
- Primary CTA button
- Clean spacing
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

Length:

300–800 words.

Must include:

- Primary keyword naturally
- Decision criteria
- Clear explanation of use cases
- Neutral tone
- No hype
- No fake claims

No exaggerated marketing language.

---

## 4️⃣ QUICK RECOMMENDATION BLOCK

Format:

4 cards in grid layout.

Each card includes:

- Use case
- Tool name
- Short reasoning
- CTA button

Cards must use existing .card styling from main.css.

---

## 5️⃣ FULL COMPARISON TABLE

Columns required:

- Tool
- Preis
- Kostenloser Plan
- Integrationen
- Bedienbarkeit
- API
- DSGVO
- Hosting
- CTA

Rules:

- Must be responsive
- Horizontal scroll allowed on mobile
- No fake ratings
- No invented statistics
- CTA per row required

---

## 6️⃣ MINI REVIEWS (PER TOOL)

Each tool section must include:

- H2 with tool name
- Neutral description
- “Ideal für”
- Pros list
- Cons list
- CTA button

No fake testimonials.
No fabricated claims.

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
- Anchortext muss kontextuell sein

No generic “hier klicken”.

---

# 🎨 DESIGN SYSTEM

Must follow:

- assets/css/main.css
- Existing button classes
- Existing card classes
- Existing container width

No new design system.
No external CSS frameworks.

Allowed accent colors:

- #2563EB
- #1D4ED8
- #3B82F6

No random color families.

---

# 💰 MONETIZATION RULES

Must include:

- CTA above fold
- CTA in quick block
- CTA in each mini review
- CTA in table rows
- Clear, visible buttons

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

# 🔵 END OF BLUEPRINT V2.2