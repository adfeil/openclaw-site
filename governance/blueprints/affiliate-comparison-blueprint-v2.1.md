# AFFILIATE COMPARISON BLUEPRINT – V2.1
Machine-Readable · Strict · Scalable  
Owner: Adrian  
Project: tool-index.com  

---

# ⚠️ BLUEPRINT IS READ-ONLY

BLUEPRINT IS READ-ONLY: Never edit this blueprint file.  
Only read and apply it.  
Never overwrite, modify, append to, or refactor this file.

This file defines structure and output contract only.

---

# 🎯 PURPOSE

Generate a high-converting affiliate comparison page that:

- ranks organically
- builds trust
- drives affiliate clicks
- follows strict structural rules
- maintains brand consistency
- allows controlled visual variation

Primary Goal: Affiliate Revenue  
Secondary Goal: SEO Authority  
Optional: Lead Capture  

---

# 📁 PATH CONTRACT (MANDATORY)

If page type = comparison:

/compare/<slug>/index.html  
/compare/<slug>/styles.css  
(optional) /compare/<slug>/script.js  

Rules:

- <slug> must be lowercase
- words separated by hyphens
- no special characters
- no uppercase letters
- no spaces
- no trailing slash inside slug

Example:

/compare/beste-terminbuchungssoftware/

If folder does not exist → create it.  
Never generate files outside this structure.  
Never write into repository root.  
Never modify unrelated folders.

---

# 📦 OUTPUT CONTRACT (STRICT)

The bot MUST:

- fully overwrite index.html
- fully overwrite styles.css
- optionally overwrite script.js
- never append to existing HTML
- never create duplicate versions
- never create index-final.html or similar
- never generate partial sections

No placeholders.  
No TODO comments.  
No unfinished components.  
No "example text".

Output must be production-ready.

---

# 🛡 WRITE SAFETY RULES (MANDATORY)

The bot may ONLY write inside:

/compare/<slug>/

The bot must NEVER:

- modify repository root
- modify /index.html
- modify homepage
- modify other compare folders
- modify governance folder
- modify blueprint files
- modify existing categories
- modify unrelated assets
- create files outside the defined compare slug folder

If any file outside /compare/<slug>/ is touched:
STOP generation and abort.

---

# 🧱 STRUCTURE ENFORCEMENT (NEVER CHANGE ORDER)

Every comparison page MUST follow this exact order:

1. HERO SECTION  
2. TRUST STRIP  
3. SEO INTRO CONTENT  
4. QUICK RECOMMENDATION BLOCK  
5. FULL COMPARISON TABLE  
6. MINI REVIEWS (per tool)  
7. EDITOR RECOMMENDATION  
8. FAQ SECTION  
9. INTERNAL LINKS BLOCK  
10. FOOTER  

No sections may be removed.  
No additional sections may be inserted between them.  
No reordering allowed.

---

# 🧩 SECTION SPECIFICATIONS

---

## 1️⃣ HERO SECTION

Must include:

- Exactly one H1 (only H1 on entire page)
- Benefit-driven headline
- Outcome-focused subheadline
- Primary CTA button (visible above fold)
- Soft blue gradient background

CTA Style:

- Filled button
- Brand accent color
- Rounded corners
- Subtle hover effect

---

## 2️⃣ TRUST STRIP

Position: directly below hero.

Must include:

- Badge (e.g. "Vergleich 2026")
- Numerical credibility signal

Examples:

- "12 Tools analysiert"
- "150+ Stunden Recherche"
- "Aktualisiert: März 2026"

Compact horizontal layout.

---

## 3️⃣ SEO INTRO CONTENT (MANDATORY)

Length:

300–800 words

Must include:

- Primary keyword naturally
- Topic explanation
- Decision factors
- Educational tone
- No marketing hype
- No exaggerated claims

No fluff.

---

## 4️⃣ QUICK RECOMMENDATION BLOCK

Format: 4 cards in grid layout

Structure:

Use Case  
Recommended Tool  
CTA Button  

Must appear above fold on desktop.

Card style:

- Soft shadow
- Subtle hover effect
- Rounded corners
- Clear CTA inside card

---

## 5️⃣ FULL COMPARISON TABLE

Columns required:

- Tool
- Price
- Free Plan
- Integrations
- Ease of Use
- API
- GDPR
- Hosting Model
- CTA

Table rules:

- Responsive
- Horizontal scroll on mobile
- Sticky header on desktop
- Highlight best-value row visually
- Clear CTA per row

No fake ratings.

---

## 6️⃣ MINI REVIEWS (PER TOOL)

Each tool section must include:

- H2 with tool name
- Short neutral description
- "Ideal for" section
- Pros list
- Cons list
- Clear CTA button

No fabricated reviews.  
No fake user testimonials.

---

## 7️⃣ EDITOR RECOMMENDATION

Must include:

- Clear reasoning
- Target audience defined
- Strong CTA
- Framed visual box
- Slight visual emphasis

---

## 8️⃣ FAQ SECTION

5–8 questions.

Must include:

- Comparison questions
- Pricing questions
- GDPR/data protection questions
- Beginner suitability

Use H3 for questions.

---

## 9️⃣ INTERNAL LINKS BLOCK

At end of content:

- 3–5 related comparisons
- 2–3 related reviews
- Contextual anchor text
- No generic "click here"

---

## 🔻 FOOTER (GLOBAL STANDARD)

Footer must contain:

- Affiliate Disclosure link
- Impressum link
- Datenschutz link

Disclosure must NOT appear in header.  
No legal paragraphs inside content body.

Footer style must remain consistent across site.

---

# 🎨 DESIGN SYSTEM (LIGHT MODE DEFAULT)

Light mode is default.  
Dark mode optional (toggle allowed but not required).

---

## Color System

Primary Accent: #2563EB  

Allowed Accent Variations:

- #1D4ED8
- #3B82F6
- #0EA5E9

Background:

- #FFFFFF
- #F9FAFB
- #F3F4F6

Text:

- #111827
- #374151

No random colors allowed outside this palette.

---

# 📐 MINIMAL GRID SYSTEM

Container:

- max-width: 1100–1200px
- centered

Grid:

- 12 columns desktop
- 2 columns tablet
- 1 column mobile

Spacing:

- 60–100px section padding desktop
- 40–60px mobile
- generous white space

---

# 🎨 VISUAL VARIATION RULES (CONTROLLED)

To prevent identical page appearance while preserving brand:

Allowed Variation:

- Hero gradient may vary within blue spectrum
- Accent shade may change per page (within allowed palette)
- Badge wording may vary
- Quick recommendation highlight card may change position
- Editor recommendation box may vary slightly in emphasis

Not Allowed:

- Changing layout order
- Changing section hierarchy
- Changing core component structure
- Using different color families
- Adding experimental components

Variation must stay inside brand system.

---

# 🧾 SEO RULES

Must generate:

- Title tag
- Meta description
- Canonical tag
- Clean semantic HTML
- Structured H2/H3 hierarchy
- Internal anchor links
- Fast loading
- No heavy inline scripts

Target length:

1000–2500 words total

---

# 💰 MONETIZATION RULES

- CTA above fold
- CTA inside quick block
- CTA inside each review
- CTA inside table
- Clear visible buttons
- No aggressive popups
- No misleading urgency tactics

---

# 🚫 STRICT PROHIBITIONS

The bot must NOT:

- invent user reviews
- fabricate ratings
- copy competitor content
- fabricate statistics
- use exaggerated marketing language
- modify this blueprint

---

# ✅ DEFINITION OF DONE

Page is complete when:

- Structure strictly followed
- Files placed correctly in /compare/<slug>/
- Fully responsive
- Visually clean
- SEO-ready
- Affiliate-ready
- No placeholders
- No broken links

Only then suggest deployment.

---

# 🔵 END OF BLUEPRINT V2.1