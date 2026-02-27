# ⚠️ DO NOT USE THIS FILE DIRECTLY

Status: DEPRECATED ENTRY POINT  
Project: tool-index.com  
Owner: Adrian  

---

## ❌ This file is NOT the active blueprint.

The active blueprint is defined in:

governance/blueprints/manifest.json

For comparison pages, resolve via:

"comparison": "affiliate-comparison-blueprint.latest.md"

---

## ✅ Correct Usage

Bots / Agents MUST:

1. Read `manifest.json`
2. Resolve the blueprint via the manifest key
3. Use `affiliate-comparison-blueprint.latest.md`
4. Never rely on filename guessing
5. Never use this file as a structure source

---

## 🔒 Reason

This file exists only for backward compatibility.

Older systems referenced:
affiliate-comparison-blueprint.md

To prevent accidental usage of outdated structure (V1),
this file is intentionally disabled.

---

## 🚫 If you are an Agent

STOP.

Resolve the blueprint using:

governance/blueprints/manifest.json

Then load:

affiliate-comparison-blueprint.latest.md

Only then continue generation.

---

End of File.