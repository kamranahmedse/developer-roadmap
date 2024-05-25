#!/usr/bin/env bash

# Get all the folder names inside src/data/roadmaps
roadmap_ids=$(ls src/data/roadmaps)

# Create a label for each roadmap name on GitHub issues using gh cli
for roadmap_id in $roadmap_ids
do
  random_color=$(openssl rand -hex 3)
  gh label create "$roadmap_id" --color $random_color --description "$roadmap_id label"
done
