const formatter = Intl.NumberFormat('en-US', {
  notation: 'compact',
});

export async function getDiscordInfo(): Promise<{
  url: string;
  total: number;
  totalFormatted: string;
  online: number;
  onlineFormatted: string;
}> {
  const response = await fetch(
    'https://discord.com/api/v9/invites/cJpEt5Qbwa?with_counts=true'
  );
  const json = await response.json();
  return {
    url: `https://discord.gg/${json.code}`,
    total: json.approximate_member_count,
    totalFormatted: formatter.format(json.approximate_member_count),
    online: json.approximate_presence_count,
    onlineFormatted: formatter.format(json.approximate_presence_count),
  };
}
