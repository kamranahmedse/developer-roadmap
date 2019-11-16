#!/usr/bin/env bash

next build
next export
echo 'roadmap.sh' > out/CNAME
touch out/.nojekyll
