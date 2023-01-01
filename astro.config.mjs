import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank'}]
    ]
  },
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  })]
});