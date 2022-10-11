#!/bin/sh

set -e

current_branch=$(git branch --show-current)
git checkout master
gh pr merge "$current_branch" -s -t "$1"
