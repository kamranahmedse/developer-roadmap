import type { SitemapItem } from '@astrojs/sitemap';

export function shouldIndexPage(page: string): boolean {
  return ![
    'https://roadmap.sh/404/',
    'https://roadmap.sh/terms/',
    'https://roadmap.sh/privacy/',
  ].includes(page);
}

export function serialize(item: SitemapItem): SitemapItem {
  console.log(item);
  return {
    ...item,
  };
}
