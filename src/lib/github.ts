// --- Constants & Utilities ---
const DEFAULT_STAR_COUNT = 224_000;
const DEFAULT_RANKING = '7th';
const CACHE_TTL_MS = 1000 * 60 * 10; // 10 minutes cache

const formatter = Intl.NumberFormat('en-US', { notation: 'compact' });

// --- Cached State ---
let cachedStars: { value: number; fetchedAt: number } | null = null;
let cachedRanking: { value: string; fetchedAt: number } | null = null;

// --- GitHub Star Count ---
export async function countStars(
  repo: string = 'kamranahmedse/developer-roadmap'
): Promise<number> {
  if (cachedStars && Date.now() - cachedStars.fetchedAt < CACHE_TTL_MS) {
    return cachedStars.value;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { 'User-Agent': 'StarCounter-App' },
    });

    if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
    const data = await response.json();

    const stars = Number(data.stargazers_count) || DEFAULT_STAR_COUNT;
    cachedStars = { value: stars, fetchedAt: Date.now() };
    return stars;
  } catch (error) {
    console.warn('⚠️ Failed to fetch GitHub stars:', error);
    cachedStars = { value: DEFAULT_STAR_COUNT, fetchedAt: Date.now() };
    return DEFAULT_STAR_COUNT;
  }
}

// --- Formatted Stars ---
export async function getFormattedStars(
  repo: string = 'kamranahmedse/developer-roadmap'
): Promise<string> {
  const stars =
    import.meta.env?.DEV === true
      ? DEFAULT_STAR_COUNT
      : await countStars(repo);

  return formatter.format(stars);
}

// --- GitHub Repository Rank ---
export async function getRepositoryRank(
  repo: string = 'kamranahmedse/developer-roadmap'
): Promise<string> {
  if (cachedRanking && Date.now() - cachedRanking.fetchedAt < CACHE_TTL_MS) {
    return cachedRanking.value;
  }

  try {
    const response = await fetch(
      'https://api.github.com/search/repositories?q=stars:>100000&sort=stars&order=desc',
      { headers: { 'User-Agent': 'RepoRanker-App' } }
    );

    if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
    const data = await response.json();

    const repositories: Array<{ full_name: string }> = data.items || [];
    const rankIndex = repositories.findIndex(
      (r) => r.full_name.toLowerCase() === repo.toLowerCase()
    );

    const rank = rankIndex >= 0 ? rankIndex + 1 : undefined;
    const ranking = rank ? `${rank}${getOrdinalSuffix(rank)}` : DEFAULT_RANKING;

    cachedRanking = { value: ranking, fetchedAt: Date.now() };
    return ranking;
  } catch (error) {
    console.warn('⚠️ Failed to fetch repository rank:', error);
    cachedRanking = { value: DEFAULT_RANKING, fetchedAt: Date.now() };
    return DEFAULT_RANKING;
  }
}

// --- Ordinal Suffix Helper ---
function getOrdinalSuffix(rank: number): string {
  const mod100 = rank % 100;
  if (mod100 >= 11 && mod100 <= 13) return 'th';
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

// --- GitHub Top Languages ---
export function getTopGitHubLanguages(
  languages: Record<string, number>
): string[] {
  const total = Object.values(languages).reduce((sum, val) => sum + val, 0);
  if (total === 0) return [];

  const sorted = Object.entries(languages).sort((a, b) => b[1] - a[1]);
  let sum = 0;
  const topLanguages: string[] = [];

  for (const [language, bytes] of sorted) {
    sum += bytes;
    topLanguages.push(language);
    if (sum / total >= 0.9) break;
  }

  return topLanguages;
}
