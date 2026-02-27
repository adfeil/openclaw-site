#!/usr/bin/env bash
set -euo pipefail

REPO="${REPO:-$(cd "$(dirname "$0")/.." && pwd)}"

HEADER_FILE="$REPO/components/header.html"
FOOTER_FILE="$REPO/components/footer.html"

if [[ ! -f "$HEADER_FILE" ]]; then
  echo "❌ Missing: $HEADER_FILE" >&2
  exit 1
fi
if [[ ! -f "$FOOTER_FILE" ]]; then
  echo "❌ Missing: $FOOTER_FILE" >&2
  exit 1
fi

HEADER="$(cat "$HEADER_FILE")"
FOOTER="$(cat "$FOOTER_FILE")"

# Files to process: root index + any nested index.html (except archive/, backups/, .git/)
mapfile -t FILES < <(
  find "$REPO" \
    -type f -name "index.html" \
    -not -path "$REPO/.git/*" \
    -not -path "$REPO/archive/*" \
    -not -path "$REPO/backups/*" \
    -print
)

echo "▶ build-components: ${#FILES[@]} pages"

for f in "${FILES[@]}"; do
  # 1) Replace header marker
  if grep -q "<!-- COMPONENT:HEADER -->" "$f"; then
    perl -0777 -i -pe 's/<!-- COMPONENT:HEADER -->/'"$(printf '%s' "$HEADER" | perl -pe 's/\\/\\\\/g; s/\$/\\$/g; s/\@/\\@/g')"'/s' "$f"
  fi

  # 2) Replace footer marker
  if grep -q "<!-- COMPONENT:FOOTER -->" "$f"; then
    perl -0777 -i -pe 's/<!-- COMPONENT:FOOTER -->/'"$(printf '%s' "$FOOTER" | perl -pe 's/\\/\\\\/g; s/\$/\\$/g; s/\@/\\@/g')"'/s' "$f"
  fi

  # 3) Ensure theme.js is included (before </body>)
  if ! grep -q '/assets/js/theme.js' "$f"; then
    perl -0777 -i -pe 's#</body>#<script src="/assets/js/theme.js" defer></script>\n</body>#s' "$f"
  fi

done

echo "✅ build-components done"