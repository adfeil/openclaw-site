#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: scripts/newpage.sh <slug> [Title]"
  echo "Example: scripts/newpage.sh passwort-manager \"Die besten Passwort-Manager 2026\""
  exit 1
fi

SLUG="$1"
TITLE="${2:-}"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TPL="$ROOT/templates/master"
DEST="$ROOT/$SLUG"

if [[ ! -d "$TPL" ]]; then
  echo "ERROR: Template folder not found: $TPL"
  exit 1
fi

if [[ -e "$DEST" ]]; then
  echo "ERROR: Destination already exists: $DEST"
  exit 1
fi

mkdir -p "$DEST"
cp -av "$TPL/." "$DEST/" >/dev/null

if [[ -n "$TITLE" ]]; then
  perl -0777 -i -pe "s|<title>.*?</title>|<title>$TITLE</title>|s" "$DEST/index.html"
  perl -0777 -i -pe "s|<h1>.*?</h1>|<h1>$TITLE</h1>|s" "$DEST/index.html"
fi

echo "✅ Created page: /$SLUG/ from templates/master"
ls -la "$DEST"
