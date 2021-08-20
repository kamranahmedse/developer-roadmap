const path = require('path');
const rehypePrism = require('@mapbox/rehype-prism');

const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)?$/,
  options: {
    rehypePlugins: [rehypePrism]
  }
});

let nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  webpack(config, options) {
    config.resolve.modules.push(path.resolve('./'));

    // Transforms SVGs to components
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  }
};

nextConfig = withMDX(nextConfig);

module.exports = nextConfig;
