const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

module.exports = withCSS(withSass({
  exportPathMap: () => {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/privacy': { page: '/privacy' },
      '/terms': { page: '/terms' },
      '/frontend': { page: '/frontend' },
      '/backend': { page: '/backend' },
      '/devops': { page: '/devops' },
      '/roadmaps/frontend': { page: '/roadmaps/frontend' },
      '/roadmaps/backend': { page: '/roadmaps/backend' },
      '/roadmaps/devops': { page: '/roadmaps/devops' },
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