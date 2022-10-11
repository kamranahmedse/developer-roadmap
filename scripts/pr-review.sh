#!/bin/sh

# Checking a pr using hub

set -e

require() {
  if [[ -z $(command -v "$1" 2>/dev/null) ]]; then
    echo " 🛑  Please install $1 and try again"
    exit 1
  fi
}

require jq
require gh
require fzf

# get the list of open pull requests
prs=$(gh pr list --json number,title --limit 100 | jq -r '.[] | "\(.number) \(.title)"')

# select a pr
pr=$(echo "$prs" | fzf --prompt="Select a PR: " --height=50% --reverse --preview="gh pr view {1} --json 'files' | jq -r '.files|map(.path)|.[]'")

# get the pr number
pr_number=$(echo "$pr" | awk '{print $1}')

[ -z "$pr_number" ] && echo "🛑 No PR selected" && exit 1

echo "Checkout PR: $pr_number"
gh pr checkout "$pr_number"
