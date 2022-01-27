#!/usr/bin/env bash

rm -rf out
next build
next export
echo 'Developers Roadmap' > out/CNAME
touch out/.nojekyll
