#!/usr/bin/env bash

# Fetch issues JSON data and parse it properly
issues=$(gh issue list --repo kamranahmedse/developer-roadmap --search "sort:created-asc" --state open --limit 500 --json number,title,createdAt,updatedAt,state,url,comments,reactionGroups,body | jq -c '.[]')

# checks the body of issue, identifies the slug from the roadmap URLs
# and labels the issue with the corresponding slug
while IFS= read -r issue; do
    created_at=$(echo "$issue" | jq -r '.createdAt')
    updated_at=$(echo "$issue" | jq -r '.updatedAt')
    issue_number=$(echo "$issue" | jq -r '.number')
    issue_title=$(echo "$issue" | jq -r '.title')
    reaction_groups=$(echo "$issue" | jq -r '.reactionGroups')
    has_reactions=$(echo "$issue" | jq -r '.reactionGroups | length')
    comment_count=$(echo "$issue" | jq -r '.comments | length')
    body_characters=$(echo "$issue" | jq -r '.body | length')

    # If the issue has no body, then skip it
    if [ "$body_characters" -eq 0 ]; then
        continue
    fi

    # Extract the roadmap URLs from the issue body
    roadmap_urls=$(echo "$issue" | jq -r '.body' | grep -o 'https://roadmap\.sh/[^ ]*')

    # If no roadmap URLs found, then skip it
    if [ -z "$roadmap_urls" ]; then
        continue
    fi

    # URL is like https://roadmap.sh/frontend
    # Extract the slug from the URL
    slug_of_first_url=$(echo "$roadmap_urls" | head -n 1 | sed 's/https:\/\/roadmap\.sh\///')

    if [ -z "$slug_of_first_url" ]; then
        continue
    fi

    # Label the issue with the slug
    gh issue edit "$issue_number" --add-label "$slug_of_first_url"
done <<< "$issues"
