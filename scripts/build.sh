#!/usr/bin/env bash

ENV_FILE=.env

## Make sure that the configuration file exists before continuing
if [ ! -f "$ENV_FILE" ]; then
  echo "$ENV_FILE does not exist"
  exit 1
fi

next build
next export
echo 'roadmap.sh' > out/CNAME
touch out/.nojekyll
