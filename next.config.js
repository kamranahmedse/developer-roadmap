const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const rehypePrism = require('@mapbox/rehype-prism')

const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)?$/,
  options: {
    rehypePlugins: [rehypePrism],
  },
});

const options = {
  exportPathMap: () => {
    // @todo make it dynamic for pages, authors and guides
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/privacy': { page: '/privacy' },
      '/terms': { page: '/terms' },
      '/roadmaps': { page: '/roadmaps' },
      '/guides': { page: '/guides' },
      '/frontend': { page: '/[fallback]', query: "frontend" },
      '/backend': { page: '/[fallback]', query: "backend" },
      '/devops': { page: '/[fallback]', query: "devops" },
      '/roadmaps/frontend': { page: '/roadmaps/[roadmap]', query: "frontend" },
      '/roadmaps/backend': { page: '/roadmaps/[roadmap]', query: "backend" },
      '/roadmaps/devops': { page: '/roadmaps/[roadmap]', query: "devops" },
    };
  },

  // Allow mdx and md files to be pages
  pageExtensions: ['jsx', 'js', 'mdx', 'md'],

  webpack(config, options) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    });

    return config
  },
};

//
let nextConfig = withSass(options);
nextConfig = withCSS(nextConfig);
nextConfig = withMDX(nextConfig);

module.exports = nextConfig;