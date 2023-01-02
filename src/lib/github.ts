const formatter = Intl.NumberFormat('en-US', {
  notation: 'compact',
});

export async function countStars(
  repo = 'kamranahmedse/developer-roadmap'
): Promise<number> {
  const repoData = await fetch(`https://api.github.com/repos/${repo}`);
  const json = await repoData.json();

  return json.stargazers_count * 1;
}

export async function getFormattedStars(
  repo = 'kamranahmedse/developer-roadmap'
): Promise<string> {
  if (import.meta.env.DEV) {
    return '223k';
  }

  const stars = await countStars(repo);

  return formatter.format(stars);
}
