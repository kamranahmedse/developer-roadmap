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

const defaultRanking = '7th';
let ranking: string;

export async function getRepositoryRank(
  repo = 'kamranahmedse/developer-roadmap',
): Promise<string> {
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=stars:>100000&o=desc&s=stars`,
    );
    const json = await response.json();
    const repositories = json.items || [];
    for (let rank = 1; rank <= repositories.length; rank++) {
      if (
        repositories[rank - 1].full_name.toLowerCase() === repo.toLowerCase()
      ) {
        ranking = `${rank}${getOrdinalSuffix(rank)}`;
      }
    }
  } catch (e) {
    console.log('Failed to fetch ranking');
    ranking = defaultRanking;
  }

  return ranking;
}

function getOrdinalSuffix(rank: number): string {
  if (11 <= rank % 100 && rank % 100 <= 13) {
    return 'th';
  }
  switch (rank % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

// fetches the top languages of a GitHub repository
// i.e. 90% of the bytes are in these languages
export function getTopGitHubLanguages(languages: Record<string, number>) {
  const total = Object.values(languages).reduce((a, b) => a + b, 0);

  let sum = 0;
  let topLanguages = [];
  for (const [language, bytes] of Object.entries(languages)) {
    sum += bytes;
    topLanguages.push(language);
    if (sum / total >= 0.9) {
      break;
    }
  }

  return topLanguages;
}
