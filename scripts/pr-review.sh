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

prd="$(gh pr list --json 'number,title' | jq -r '.[]| [.number, .title] | @sh' | column -t -s"'" | fzf)"
[ -z "$prd" ] && echo "No PR selected" && exit 0

pr_id="$(echo "$prd" | awk '{print $1}')"

gh pr view "$pr_id" --json "files" | jq -r '.files|map(.path)|.[]'
gh pr checkout "$pr_id"
