#!/usr/bin/env bash

set -e

if [ -n "$GH_PAT" ]; then
  LATEST_COMMIT_HASH=$(git ls-remote "https://${GH_PAT}@github.com/roadmapsh/web-draw.git" refs/heads/main | awk '{print $1}')
else
  LATEST_COMMIT_HASH=$(git ls-remote git@github.com:roadmapsh/web-draw.git refs/heads/main | awk '{print $1}')
fi

echo "Using commit hash: $LATEST_COMMIT_HASH"

# Install the package using the commit hash
pnpm add github:roadmapsh/web-draw#"$LATEST_COMMIT_HASH"\&path:packages/editor