import { siteConfig } from './config.ts';

const formatter = Intl.NumberFormat('en-US', {
  notation: 'compact',
});

let discordStats: any = null;
export async function getDiscordInfo(): Promise<{
  url: string;
  total: number;
  totalFormatted: string;
  online: number;
  onlineFormatted: string;
}> {
  if (discordStats) {
    return discordStats;
  }

  if (import.meta.env.DEV) {
    return {
      url: 'https://roadmap.sh/discord',
      total: 27000,
      totalFormatted: '27k',
      online: 49,
      onlineFormatted: '3.44k',
    };
  }

  const response = await fetch(
    'https://discord.com/api/v9/invites/cJpEt5Qbwa?with_counts=true',
  );
  try {
    const json: any = await response.json();

    discordStats = {
      url: `https://discord.gg/${json.code}`,
      total: json.approximate_member_count,
      totalFormatted: formatter.format(json.approximate_member_count),
      online: json.approximate_presence_count,
      onlineFormatted: formatter.format(json.approximate_presence_count),
    };
  } catch (e) {
    discordStats = {
      url: `https://roadmap.sh/discord`,
      total: 17000,
      totalFormatted: '17k',
      online: 0,
      onlineFormatted: formatter.format(0),
    };
  }

  return discordStats;
}
