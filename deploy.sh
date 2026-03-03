#!/usr/bin/env bash
set -euo pipefail

APPROVAL_FILE="$HOME/.openclaw/workspace/approvals/APR-DEPLOY-001.yml"
WORKSPACE="$HOME/.openclaw/workspace"
REPO_DIR="$HOME/openclaw-site"
REPO_APPROVAL_SOURCE="$REPO_DIR/governance/approvals/APR-DEPLOY-001.yml"

TRIGGER_FILE="$WORKSPACE/triggers/deploy.request"

die() { echo "❌ $*" >&2; exit 1; }

# optionaler Telegram-Trigger (nur Trigger löschen, Approval bleibt)
if [ -f "$TRIGGER_FILE" ]; then
  echo "⚡ Deploy triggered via Telegram request file"
  rm -f "$TRIGGER_FILE"
fi

# Approval sicherstellen
if [ ! -f "$APPROVAL_FILE" ]; then
  if [ -f "$REPO_APPROVAL_SOURCE" ]; then
    mkdir -p "$(dirname "$APPROVAL_FILE")"
    cp -f "$REPO_APPROVAL_SOURCE" "$APPROVAL_FILE"
    echo "✅ Approval copied from repo → $APPROVAL_FILE"
  else
    die "BLOCKED: Missing approval APR-DEPLOY-001 (not found in workspace or repo)"
  fi
fi

echo "✅ Approval found → starting deploy"

cd "$REPO_DIR" || die "Repo dir not found: $REPO_DIR"

# 0) Safety: Repo muss sauber sein (außer wir erzeugen gleich data/ + manifest.json)
# Wenn jetzt schon Änderungen drin sind → ABORT, damit wir nie aus Versehen anderes pushen.
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ Repo has uncommitted changes BEFORE deploy. Aborting to avoid accidental push."
  git status -sb || true
  exit 1
fi

# -----------------------------
# 1) Copy daily-scout files (workspace → repo/data)
# -----------------------------
mkdir -p data

shopt -s nullglob
FILES=("$WORKSPACE/research/daily-scout-"*.md)
shopt -u nullglob

if [ ${#FILES[@]} -gt 0 ]; then
  cp -f "${FILES[@]}" data/
  echo "✅ Copied ${#FILES[@]} scout file(s) into repo/data"
else
  echo "⚠️ No scout files found (workspace/research). Continuing."
fi

# -----------------------------
# 2) Build manifest.json (repo root)
# -----------------------------
python3 <<'PY'
import glob, json, os, datetime, subprocess

repo_data = os.path.expanduser("~/openclaw-site/data")
files = sorted(glob.glob(os.path.join(repo_data, "daily-scout-*.md")), reverse=True)

git_commit = subprocess.check_output(["git", "rev-parse", "HEAD"], text=True).strip()

manifest = {
  "files": [{"name": os.path.basename(f), "path": "data/" + os.path.basename(f)} for f in files],
  "generated": datetime.datetime.utcnow().replace(microsecond=0).isoformat() + "Z",
  "git_commit": git_commit
}

out = os.path.expanduser("~/openclaw-site/manifest.json")
with open(out, "w", encoding="utf-8") as f:
  json.dump(manifest, f, indent=2, ensure_ascii=False)
  f.write("\n")
PY

echo "✅ manifest.json built"

# -----------------------------
# 3) Guardrail: only allow changes in data/ and manifest.json
# -----------------------------
CHANGED="$(git status --porcelain || true)"

if [ -z "$CHANGED" ]; then
  echo "ℹ️ Nothing changed. No commit/push."
  exit 0
fi

BAD=0
while IFS= read -r line; do
  # porcelain format: "XY path"
  path="${line:3}"
  # allow: manifest.json or anything under data/
  if [[ "$path" == "manifest.json" || "$path" == data/* ]]; then
    continue
  fi
  echo "❌ OUT-OF-DEPLOY-SCOPE change detected: $line"
  BAD=1
done <<< "$CHANGED"

if [ "$BAD" -eq 1 ]; then
  echo
  echo "ABORT: deploy.sh is only allowed to commit/push data/ + manifest.json."
  echo "Fix those changes manually, then retry."
  git status -sb || true
  exit 1
fi

# -----------------------------
# 4) Commit + push (scoped)
# -----------------------------
git add manifest.json data/ || die "git add failed"

git commit -m "bot: auto deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)" || echo "ℹ️ nothing to commit"
git push

rm -f "$APPROVAL_FILE"
echo "🧹 Approval removed (one-time deploy)"

echo "🚀 Deploy finished"