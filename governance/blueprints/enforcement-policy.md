# Blueprint Enforcement Policy (ToolIndex)
Status: ACTIVE · Read-Only
Ziel: Verhindern, dass Bots/Agenten versehentlich alte Blueprints verwenden.

---

## 0) Goldene Regel (Single Source of Truth)

**Alle Bots/Agenten müssen Blueprints ausschließlich über diese Datei auflösen:**

`governance/blueprints/manifest.json`

Direktes “Raten” oder “Namen raten” ist verboten.

---

## 1) Manifest ist der Einstiegspunkt

### Datei
`governance/blueprints/manifest.json`

### Bedeutung
- Legt fest, **welcher Blueprint-Dateiname** für welchen Page-Type gilt.
- Der Eintrag ist die **aktuell gültige Version** (Alias / “latest”).

### Aktuelle Keys (Stand jetzt)
- `comparison` → `affiliate-comparison-blueprint.latest.md`
- `utility` → `affiliate-utility-blueprint.md`

**Wenn ein Blueprint aktualisiert wird:**
1) neue Version als `...-vX.Y.md` anlegen  
2) `...latest.md` auf neuen Inhalt setzen  
3) `manifest.json` (falls nötig) auf latest-Datei zeigen lassen  
4) optional: alte Alias-Dateien auf “DO NOT USE” umstellen

---

## 2) Hard vs Soft Regeln (Hybrid-Modus)

### HARD (niemals variieren)
- **Pfad- & Repo-Scope-Regeln**: Es darf nur in den erlaubten Pfaden geschrieben werden.
- **Section-Order / Struktur-Kontrakt** gemäß jeweiligem Blueprint (z.B. HERO → TRUST → SEO INTRO → …).
- **Keine Änderungen an Governance/Blueprint-Dateien** während Page-Generierung.
- **Keine Änderungen an globalen Assets**, außer es ist explizit freigegeben.

### SOFT (darf variieren)
- Tool-Auswahl (nach Research)
- Texte / Beispiele / Use-Cases
- Badge-Formulierungen, kleine Layout-Details innerhalb Design-System
- Interne Verlinkung (solange sinnvoll und korrekt)

---

## 3) Repo-Pfad-Konventionen (ToolIndex-spezifisch)

Dieses Repo ist **tool-index.com** und nutzt folgende Live-Pfade:

- Kategorien: `/kategorien/<slug>/index.html`
- Vergleiche: `/vergleich/<slug>/index.html`
- Reviews: `/reviews/<slug>/index.html`
- Tools A–Z Index: `/tools/index.html`

**Wichtig:**
Wenn ein Blueprint eine andere Struktur (z.B. `/compare/...`) erwähnt, gilt im ToolIndex-Repo:
➡️ **/vergleich/** als kanonischer Vergleichs-Pfad, bis wir es bewusst ändern.

---

## 4) Auflösungs-Regel (Pflicht-Workflow für Bots)

Bevor ein Bot irgendeine Seite erstellt/ändert:

1) `manifest.json` lesen  
2) Passenden Blueprint anhand des Page-Type auflösen (`comparison`, `review`, `category`, `tool`, `utility` …)  
3) Blueprint lesen und Regeln anwenden  
4) Nur innerhalb des erlaubten Zielpfads schreiben  
5) Validieren: Struktur / keine verbotenen Dateien angefasst / keine Platzhalter

Wenn Schritt 1–3 nicht möglich ist: **STOP**.

---

## 5) Versionierung & “latest”

### Versionierte Dateien (Beispiele)
- `affiliate-comparison-blueprint-v2.2.md`

### Latest Alias
- `affiliate-comparison-blueprint.latest.md` enthält **immer exakt den neuesten gültigen Inhalt** für diesen Typ.

### Legacy-Dateien
- Dateien wie `affiliate-comparison-blueprint.md` sind **Legacy** und dürfen Bots nicht mehr als Primärquelle dienen.
- Sie werden entweder:
  - a) zu einem reinen Hinweis (“DO NOT USE, see latest”), oder
  - b) identisch zum latest gehalten (nur wenn ihr das wollt).

Empfehlung: **a) Hinweis-Datei**, damit niemand versehentlich V1 nutzt.

---

## 6) Minimal-Validierung vor Commit (ohne zusätzliche Tools)

Vor dem Commit sicherstellen:
- Seite enthält: `data-component="header"` und `data-component="footer"`
- Scripts: `theme.js`, `components.js`, `nav.js` (wenn globale Components genutzt werden)
- Keine `assets/js/main.js` mehr in neuen Seiten (Legacy)

---

## 7) Definition of Done (für neue Inhalte)

“Done” bedeutet:
- Richtiger Blueprint über manifest angewendet
- Richtiger Zielpfad
- Struktur eingehalten
- Kein interner Dev-Talk im User-Content
- Keine TODOs / Platzhalter
- Live testbar