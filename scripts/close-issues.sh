#!/usr/bin/env bash

# Fetch issues JSON data and parse it properly
issues=$(gh issue list --repo kamranahmedse/developer-roadmap --search "sort:created-asc" --state open --limit 500 --json number,title,createdAt,updatedAt,state,url,comments,reactionGroups,body | jq -c '.[]')

# Loop through the issues and delete the ones created in 2022 and not updated in the past year
while IFS= read -r issue; do
    created_at=$(echo "$issue" | jq -r '.createdAt')
    updated_at=$(echo "$issue" | jq -r '.updatedAt')
    issue_number=$(echo "$issue" | jq -r '.number')
    issue_title=$(echo "$issue" | jq -r '.title')
    reaction_groups=$(echo "$issue" | jq -r '.reactionGroups')
    has_reactions=$(echo "$issue" | jq -r '.reactionGroups | length')
    comment_count=$(echo "$issue" | jq -r '.comments | length')
    body_characters=$(echo "$issue" | jq -r '.body | length')

    #   if has empty body
    if [[ "$created_at" == 2024-01* ]]; then

      comment="Hey there!

Looks like this issue has been hanging around for a bit without much action. Our roadmaps have evolved quite a bit since then, and a bunch of older issues aren't really applicable anymore. So, we're tidying things up by closing out the older ones to keep our issue tracker nice and organized for future feedback.

If you still think this problem needs addressing, don't hesitate to reopen the issue. We're here to help!

Thanks a bunch!"

      gh issue comment "$issue_number" --body "$comment"
      gh issue close "$issue_number"
    fi
done <<< "$issues"
