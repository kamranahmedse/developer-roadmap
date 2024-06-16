#!/usr/bin/env bash

# Usage: warm-urls.sh <sitemap-url>
# Example: warm-urls.sh https://www.example.com/sitemap.xml

# Check if sitemap url is provided
if [ -z "$1" ]; then
  echo "Please provide sitemap URL" >&2
  exit 1
fi

# Get all URLs from sitemap
urls=$(curl -s "$1" | grep -o "<loc>[^<]*</loc>" | sed 's#<loc>\(.*\)</loc>#\1#')

failed_urls=()

# Warm up URLs
for url in $urls; do
  # Fetch the og:image URL from the meta tags
  og_image_url=$(curl -s "$url" | grep -o "<meta property=\"og:image\" content=\"[^\"]*\"" | sed 's#<meta property="og:image" content="\([^"]*\)"#\1#')

  # warm the URL
  echo "Warming up URL: $url"
  if ! curl -s -I "$url" > /dev/null; then
    failed_urls+=("$url")
  fi

  # Warm up the og:image URL
  if [ -n "$og_image_url" ]; then
    echo "Warming up OG: $og_image_url"
    if ! curl -s -I "$og_image_url" > /dev/null; then
      failed_urls+=("$og_image_url")
    fi
  else
    echo "No og:image found for $url"
  fi
done

# Print failed URLs
if [ ${#failed_urls[@]} -gt 0 ]; then
  echo "Failed to warm up the following URLs:" >&2
  for failed_url in "${failed_urls[@]}"; do
    echo "$failed_url" >&2
  done
fi
