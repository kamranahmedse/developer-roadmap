#!/usr/bin/env bash

# Function to create GitHub label with a given name, color, and description
create_label() {
    local name=$1
    local color=$2
    local description=$3
    gh label create "$name" --color "$color" --description "$description"
}

# Get all the folder names inside src/data/roadmaps
roadmap_ids=$(ls src/data/roadmaps)

# Loop through each roadmap to create a GitHub label
for roadmap_id in $roadmap_ids; do
    # Generate a random color for the label
    random_color=$(openssl rand -hex 3)

    # Create label for the roadmap
    create_label "$roadmap_id" "$random_color" "Label for $roadmap_id"
done
