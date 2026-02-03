#!/usr/bin/env bash
set -euo pipefail

APPROVAL_FILE="$HOME/governance/approvals/APR-DEPLOY-001.yml"

if [ ! -f "$APPROVAL_FILE" ]; then
  echo "❌ BLOCKED: Missing approval APR-DEPLOY-001"
  exit 1
fi

echo "✅ Approval found → deploying to GitHub"

git add .
git commit -m "bot: auto deploy $(date -u)" || echo "nothing to commit"
git push

echo "✅ Deploy finished"
