const formatter = Intl.NumberFormat('en-US', {
  notation: 'compact',
});

let starCount: number | undefined = undefined;

export async function countStars(
  repo = 'kamranahmedse/developer-roadmap'
): Promise<number> {
  if (starCount) {
    return starCount;
  }

  try {
    const repoData = await fetch(`https://api.github.com/repos/${repo}`);
    const json = await repoData.json();

    starCount = json.stargazers_count * 1;
  } catch (e) {
    console.log('Failed to fetch stars', e);
    starCount = 224000;
  }

  return starCount;
}

export async function getFormattedStars(
  repo = 'kamranahmedse/developer-roadmap'
): Promise<string> {
  if (import.meta.env.DEV) {
    return '224k';
  }

  const stars = await countStars(repo);

  return formatter.format(stars);
}
