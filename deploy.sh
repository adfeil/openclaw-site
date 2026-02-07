#!/usr/bin/env bash
set -euo pipefail

APPROVAL_FILE="$HOME/.openclaw/workspace/approvals/APR-DEPLOY-001.yml"
WORKSPACE="$HOME/.openclaw/workspace"
REPO_DIR="$HOME/openclaw-site"
REPO_APPROVAL_SOURCE="$REPO_DIR/governance/approvals/APR-DEPLOY-001.yml"

TRIGGER_FILE="$WORKSPACE/triggers/deploy.request"

# optionaler Telegram-Trigger (Approval + Trigger löschen)
if [ -f "$TRIGGER_FILE" ]; then
  echo "⚡ Deploy triggered via Telegram request file"
  rm -f "$TRIGGER_FILE"
fi

if [ ! -f "$APPROVAL_FILE" ]; then
  # idiotensicher: approval aus repo nach workspace kopieren
  if [ -f "$REPO_APPROVAL_SOURCE" ]; then
    mkdir -p "$(dirname "$APPROVAL_FILE")"
    cp -f "$REPO_APPROVAL_SOURCE" "$APPROVAL_FILE"
    echo "✅ Approval copied from repo → $APPROVAL_FILE"
  else
    echo "❌ BLOCKED: Missing approval APR-DEPLOY-001"
    echo "   not found: $APPROVAL_FILE"
    echo "   not found: $REPO_APPROVAL_SOURCE"
    exit 1
  fi
fi

echo "✅ Approval found → starting deploy"

cd "$REPO_DIR"

# -----------------------------
# 1) Copy daily-scout files
# -----------------------------
mkdir -p data

shopt -s nullglob
FILES=("$WORKSPACE/research/daily-scout-"*.md)
shopt -u nullglob

if [ ${#FILES[@]} -gt 0 ]; then
  cp -f "${FILES[@]}" data/
  echo "✅ Copied ${#FILES[@]} scout file(s)"
else
  echo "⚠️ No scout files found"
fi

# -----------------------------
# 2) Build manifest.json
# -----------------------------
python3 <<'PY'
import glob, json, os, datetime

repo = os.path.expanduser("~/openclaw-site/data")
files = sorted(glob.glob(os.path.join(repo, "daily-scout-*.md")), reverse=True)

manifest = {
  "files": [
    {"name": os.path.basename(f), "path": "data/" + os.path.basename(f)}
    for f in files
  ],
  "generated": datetime.datetime.utcnow().replace(microsecond=0).isoformat() + "Z"
}

with open(os.path.expanduser("~/openclaw-site/manifest.json"), "w") as f:
  json.dump(manifest, f, indent=2)
PY

echo "✅ manifest.json built"

# -----------------------------
# 3) Git push
# -----------------------------
git add .
git commit -m "bot: auto deploy $(date -u)" || echo "nothing to commit"
git push

rm -f "$APPROVAL_FILE"
echo "🧹 Approval removed (one-time deploy)"

echo "🚀 Deploy finished"
