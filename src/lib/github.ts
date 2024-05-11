const formatter = Intl.NumberFormat('en-US', {
  notation: 'compact',
});

const defaultStarCount = 224000;
let starCount: number | undefined = undefined;

export async function countStars(
  repo = 'kamranahmedse/developer-roadmap',
): Promise<number> {
  if (starCount) {
    return starCount;
  }

  try {
    const repoData = await fetch(`https://api.github.com/repos/${repo}`);
    const json = await repoData.json();

    starCount = json.stargazers_count * 1 || defaultStarCount;
  } catch (e) {
    console.log('Failed to fetch stars', e);
    starCount = defaultStarCount;
  }

  return starCount;
}

export async function getFormattedStars(
  repo = 'kamranahmedse/developer-roadmap',
): Promise<string> {
  const stars = import.meta.env.DEV ? defaultStarCount : await countStars(repo);

  return formatter.format(stars);
}
