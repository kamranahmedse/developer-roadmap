const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

module.exports = withCSS(withSass({
  exportPathMap: () => {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/privacy': { page: '/privacy' },
      '/terms': { page: '/terms' },
      '/roadmaps': { page: '/roadmaps' },
      '/frontend': { page: '/[fallback]', query: "frontend" },
      '/backend': { page: '/[fallback]', query: "backend" },
      '/devops': { page: '/[fallback]', query: "devops" },
      '/roadmaps/frontend': { page: '/roadmaps/[roadmap]', query: "frontend" },
      '/roadmaps/backend': { page: '/roadmaps/[roadmap]', query: "backend" },
      '/roadmaps/devops': { page: '/roadmaps/[roadmap]', query: "devops" },
    };
  },

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
}));