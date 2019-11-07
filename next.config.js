const path = require('path');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const rehypePrism = require('@mapbox/rehype-prism');
const {
  getPageRoutes,
  getGuideRoutes,
  getRoadmapRoutes,
} = require("./path-map");

const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)?$/,
  options: {
    rehypePlugins: [rehypePrism],
  },
});

const options = {
  exportPathMap: () => {
    return {
      ...getPageRoutes(),
      ...getGuideRoutes(),
      ...getRoadmapRoutes(),
    };
  },

  // Allow mdx and md files to be pages
  pageExtensions: ['jsx', 'js', 'mdx', 'md'],

  webpack(config, options) {
    // // Transforms SVGs to components
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

  config.resolve.modules.push(path.resolve('./'));

    // Allow loading images and fonts
    config.module.rules.push({
      test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
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
