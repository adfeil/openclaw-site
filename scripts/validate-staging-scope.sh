#!/usr/bin/env bash
set -euo pipefail

STAGING="${1:-}"
SCOPE_REL="${2:-}"   # z.B. "vergleich/ai-copywriting-tools"

if [[ -z "$STAGING" || -z "$SCOPE_REL" ]]; then
  echo "Usage: $0 <STAGING_DIR> <SCOPE_REL>" >&2
  exit 2
fi

if [[ ! -d "$STAGING" ]]; then
  echo "❌ STAGING dir not found: $STAGING" >&2
  exit 1
fi

# Normalize: remove leading slashes
SCOPE_REL="${SCOPE_REL#/}"

# List all files (relative paths) inside staging
mapfile -t FILES < <(cd "$STAGING" && find . -type f -print | sed 's|^\./||')

if [[ ${#FILES[@]} -eq 0 ]]; then
  echo "⚠️  STAGING is empty."
  exit 0
fi

# Allowed:
# - ONLY files under the scope folder: <SCOPE_REL>/
# (We keep it super strict for now to prevent homepage/other sections being overwritten.)
BAD=0
for p in "${FILES[@]}"; do
  if [[ "$p" == "$SCOPE_REL/"* ]]; then
    continue
  fi
  echo "❌ OUT-OF-SCOPE file in staging: $p"
  BAD=1
done

if [[ $BAD -eq 1 ]]; then
  echo
  echo "ABORT: staging contains files outside allowed scope: $SCOPE_REL/"
  echo "Fix: ensure the generator writes ONLY into: $STAGING/$SCOPE_REL/"
  exit 1
fi

echo "✅ Scope OK: staging only contains files under $SCOPE_REL/"