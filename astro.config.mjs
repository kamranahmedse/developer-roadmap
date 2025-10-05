// https://astro.build/config
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';
import { serializeSitemap, shouldIndexPage } from './sitemap.mjs';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import { minify } from '@zokki/astro-minify'
import compressor from 'astro-compressor'

import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: 'https://roadmap.sh/',
  redirects: {
    '/devops/devops-engineer': {
      status: 301,
      destination: '/devops',
    },
    '/ai-tutor': {
      status: 301,
      destination: '/ai',
    },
  },
  vite: {
    server: {
      allowedHosts: ['roadmap.sh', 'port3k.kamranahmed.info'],
    },
  },
  markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: function (element) {
            const href = element.properties.href;
            const whiteListedStarts = [
              '/',
              '#',
              'mailto:',
              'https://github.com/kamranahmedse',
              'https://thenewstack.io',
              'https://kamranahmed.info',
              'https://roadmap.sh',
            ];
            if (whiteListedStarts.some((start) => href.startsWith(start))) {
              return [];
            }
            return 'noopener noreferrer nofollow';
          },
        },
      ],
    ],
  },
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  trailingSlash: 'never',
  integrations: [sitemap({
    filter: shouldIndexPage,
    serialize: serializeSitemap,
  }), react(), minify({
    logAllFiles: false,
  }), compressor({
    gzip: false,
    brotli: true,
  }), partytown()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: [/^@roadmapsh\/editor.*$/],
    },
  },
});