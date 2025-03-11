#!/usr/bin/env bash

set -e
PACKAGE_FILE="package.json"
SEARCH_STRING="github:roadmapsh/web-draw-v2"

if grep -q "$SEARCH_STRING" "$PACKAGE_FILE"; then
  echo "❌ Commit blocked! '$SEARCH_STRING' found in $PACKAGE_FILE."
  exit 1
fi

echo "✅ Pre-commit check passed."
exit 0
