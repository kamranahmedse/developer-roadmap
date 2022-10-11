#!/bin/sh

set -e

git reset --soft HEAD~$(git rev-list --count HEAD ^master)
git checkout master
git add -A
git commit -m "$1"

