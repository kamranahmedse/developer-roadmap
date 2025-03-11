#!/usr/bin/env bash

set -e

pnpm add github:roadmapsh/web-draw-v2#path:packages/editor

# ignore the worktree changes for the package.json
git update-index --assume-unchanged package.json || true
git update-index --assume-unchanged pnpm-lock.yaml || true