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

    return config;
  }
};

nextConfig = withMDX(nextConfig);

module.exports = nextConfig;
