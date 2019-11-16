#!/usr/bin/env bash

NODE_ENV=prod next build
next export
echo 'roadmap.sh' > out/CNAME
touch out/.nojekyll
