#!/usr/bin/env bash
set -euo pipefail

REPO="/home/ubuntu/openclaw-site"
STAGING="/home/ubuntu/.openclaw/workspace/site_build/staging"

DRY_RUN=0
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=1
fi

if [[ ! -d "$STAGING" ]]; then
  echo "❌ STAGING dir not found: $STAGING" >&2
  exit 1
fi

# Whitelist: nur diese Pfade dürfen aus staging ins Repo
ALLOW_DIRS=(pages kategorien reviews vergleich assets components templates data v2)
ALLOW_FILES=(index.html styles.css script.js sitemap.xml robots.txt manifest.json CNAME README.md)

# helper
copy_dir() {
  local src="$1" dst="$2"
  if [[ $DRY_RUN -eq 1 ]]; then
    echo "DRY: sync dir  $src  ->  $dst"
    return 0
  fi

  # rsync wenn vorhanden, sonst cp
  if command -v rsync >/dev/null 2>&1; then
    mkdir -p "$dst"
    rsync -a --delete "$src/" "$dst/"
  else
    mkdir -p "$dst"
    rm -rf "$dst"/*
    cp -a "$src/." "$dst/"
  fi
}

copy_file() {
  local src="$1" dst="$2"
  if [[ $DRY_RUN -eq 1 ]]; then
    echo "DRY: copy file $src -> $dst"
    return 0
  fi
  install -m 0644 "$src" "$dst"
}

echo "▶ Apply staging -> repo"
echo "   STAGING: $STAGING"
echo "   REPO:    $REPO"
echo "   MODE:    $([[ $DRY_RUN -eq 1 ]] && echo DRY-RUN || echo APPLY)"

# 1) Sanity: staging nicht leer?
if ! find "$STAGING" -mindepth 1 -maxdepth 2 -print -quit | grep -q .; then
  echo "⚠️  STAGING is empty. Nothing to apply."
  exit 0
fi

# 2) Dirs
for d in "${ALLOW_DIRS[@]}"; do
  if [[ -d "$STAGING/$d" ]]; then
    copy_dir "$STAGING/$d" "$REPO/$d"
  fi
done

# 3) Root files
for f in "${ALLOW_FILES[@]}"; do
  if [[ -f "$STAGING/$f" ]]; then
    copy_file "$STAGING/$f" "$REPO/$f"
  fi
done

echo "✅ Done. Repo status (preview):"
cd "$REPO"
/usr/bin/git status -sb || true

echo
echo "Next:"
echo "  - Dry-run:  bash scripts/apply-staging.sh --dry-run"
echo "  - Apply:    bash scripts/apply-staging.sh"
echo "  - Commit+push machst du danach bewusst (separater Schritt)."
