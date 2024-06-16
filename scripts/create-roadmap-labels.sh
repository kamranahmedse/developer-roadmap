#!/usr/bin/env bash

# get all the folder names inside src/data/roadmaps
roadmap_ids=$(ls src/data/roadmaps)

# create a label for each roadmap name on github issues using gh cli
for roadmap_id in $roadmap_ids
do
  random_color=$(openssl rand -hex 3)
  gh label create "$roadmap_id" --color $random_color --description "Roadmap: $roadmap_id"
done