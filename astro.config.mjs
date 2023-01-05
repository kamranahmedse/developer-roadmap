// https://astro.build/config
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import rehypeExternalLinks from 'rehype-external-links';
import sitemap from '@astrojs/sitemap';
import critters from 'astro-critters';

import { serializeSitemap, shouldIndexPage } from './sitemap.mjs';

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
    // critters(),
  ],
});
