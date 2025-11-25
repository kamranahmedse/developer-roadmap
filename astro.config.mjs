// https://astro.build/config
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';
import { serializeSitemap, shouldIndexPage } from './sitemap.mjs';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

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
    '/best-practices': {
      status: 301,
      destination: '/roadmaps',
    },
    '/best-practices/aws': {
      status: 301,
      destination: '/aws-best-practices',
    },
    '/best-practices/backend-performance': {
      status: 301,
      destination: '/backend-performance-best-practices',
    },
    '/best-practices/frontend-performance': {
      status: 301,
      destination: '/frontend-performance-best-practices',
    },
    '/best-practices/api-security': {
      status: 301,
      destination: '/api-security-best-practices',
    },
    '/best-practices/code-review': {
      status: 301,
      destination: '/code-review-best-practices',
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
  integrations: [
    sitemap({
      filter: shouldIndexPage,
      serialize: serializeSitemap,
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: [/^@roadmapsh\/editor.*$/],
    },
    server: {
      allowedHosts: ['roadmap.sh', 'port3k.kamranahmed.info'],
    },
  },
});
