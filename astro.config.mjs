import { defineConfig } from 'astro/config';
import { serializeSitemap, shouldIndexPage } from './sitemap.mjs';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://roadmap.sh',
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
        },
      ],
    ],
  },
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    sitemap({
      filter: shouldIndexPage,
      serialize: serializeSitemap,
    }),
  ],
});
