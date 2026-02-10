#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HDR="/tmp/master_header.html"

if [[ ! -s "$HDR" ]]; then
  echo "ERROR: Header file missing/empty: $HDR"
  exit 1
fi

FILES=(
  "$ROOT/index.html"
  "$ROOT/neu/index.html"
  "$ROOT/website-builder/index.html"
  "$ROOT/passwort-manager/index.html"
)

for f in "${FILES[@]}"; do
  [[ -f "$f" ]] || { echo "SKIP (missing): $f"; continue; }

  out="/tmp/$(basename "$(dirname "$f")")_$(basename "$f").new"
  perl -0777 -pe '
    use strict; use warnings;
    my $hdr_path = $ENV{HDR};
    open my $H, "<", $hdr_path or die "cannot open header: $hdr_path\n";
    local $/; my $hdr = <$H>;
    die "empty header\n" unless $hdr && length($hdr) > 50;
    s|<header class="header">.*?</header>|$hdr|s or die "no header block found\n";
  ' "$f" > "$out"

  if [[ ! -s "$out" ]]; then
    echo "ERROR: output empty for $f"
    exit 1
  fi

  mv "$out" "$f"
  echo "OK: $f"
done
