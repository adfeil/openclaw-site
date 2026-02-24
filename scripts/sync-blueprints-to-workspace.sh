#!/usr/bin/env bash
set -euo pipefail

REPO_BP="/home/ubuntu/openclaw-site/governance/blueprints"
WS_BP="/home/ubuntu/.openclaw/workspace/blueprints"

mkdir -p "$WS_BP"

# Copy repo blueprints -> workspace blueprints (agent reads workspace)
cp -f "$REPO_BP/"*.md "$WS_BP/"

echo "✅ Synced blueprints:"
ls -la "$WS_BP" | sed -n '1,200p'
