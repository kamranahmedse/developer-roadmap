#!/usr/bin/env bash

set -e

LATEST_COMMIT_HASH=$(git ls-remote git@github.com:roadmapsh/web-draw.git refs/heads/main | awk '{print $1}')

echo "Using commit hash: $LATEST_COMMIT_HASH"
pnpm add "github:roadmapsh/web-draw#${LATEST_COMMIT_HASH}&path:packages/editor"