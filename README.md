# openclaw-site Frontend Source of Truth

Status: verbindlich.

## Live-Assets (Source of Truth)
Die aktuell verbindlichen Frontend-Assets sind:
- `assets/css/main.css`
- `assets/js/main.js`

Diese beiden Dateien sind der einzige gültige globale CSS/JS-Entry für die aktive Produktionslinie.

## Aktive Live-Routen
Nur diese Routen gelten als produktiv live:
- `/`
- `/vergleich/`
- `/reviews/`
- `/kategorien/`
- `/impressum/`
- `/datenschutz/`
- `/affiliate-offenlegung/`

## Nicht-produktiv / Archiv / Experimente
Folgende Bereiche/Dateien sind nicht produktiv und nicht Source of Truth:
- `v2/`
- `templates/`
- `neu/`
- `website-builder/`
- `passwort-manager/`
- `scripts/rollout-header.sh`
- `styles.css`
- `script.js`

Umgang damit:
- Keine neuen Features in diesen Bereichen bauen.
- Nur bei zwingenden Hotfixes anfassen.
- Änderungen bevorzugt in die aktive Linie (`assets/*` + Live-Routen) migrieren.

## Scout (intern/optional)
- `scout/styles.css` ist ein eigenes Scout-Stylesheet.
- Root `styles.css` ist Legacy.

`scout/` ist ein separates, internes/optionales Viewer-Modul und gehört nicht zur aktiven Live-Routen-Linie.

## 5 klare Regeln
1. Nur `assets/css/main.css` als globales Frontend-Stylesheet verwenden.
2. Nur `assets/js/main.js` als globales Frontend-Skript verwenden.
3. Header kommt aus dem V2-Header-System (`site-header`/`main.js`), nicht aus Legacy-`class="header"`.
4. Neue oder überarbeitete Seiten orientieren sich an den aktiven Live-Routen und nutzen `/assets/...`.
5. Legacy-/Archiv-Dateien werden nicht erweitert; stattdessen Migration auf die aktive Linie.

## Legacy Fundstellen
Suche nach: `/styles.css` oder `class="header"` oder `🤖 Tool Index`.

- `governance/blueprints/affiliate-utility-blueprint.md:702`
- `neu/index.html:13`
- `neu/index.html:17`
- `neu/index.html:19`
- `passwort-manager/index.html:13`
- `passwort-manager/index.html:17`
- `passwort-manager/index.html:19`
- `scripts/rollout-header.sh:29`
- `scout/index.html:7`
- `scout/index.html:12`
- `templates/master/index.html:13`
- `templates/master/index.html:17`
- `templates/master/index.html:19`
- `website-builder/index.html:13`
- `website-builder/index.html:17`
- `website-builder/index.html:19`
