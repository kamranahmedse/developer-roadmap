#!/usr/bin/env bash

rm -rf out
next build
next export
echo 'roadmap.sh' > out/CNAME
touch out/.nojekyll
