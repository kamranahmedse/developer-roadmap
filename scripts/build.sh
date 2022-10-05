#!/usr/bin/env bash

set -e

rm -rf out
next build
next export
echo 'roadmap.sh' > out/CNAME
touch out/.nojekyll
