const path = require('path');
const fs = require('fs');
const rehypePrism = require('@mapbox/rehype-prism');

/**
 * Loads the configuration for the given environment
 * @param env
 * @returns {*}
 */
const loadConfig = (env = 'dev') => {
  const configPath = `./config/${env}.json`;
  if (!fs.existsSync(configPath)) {
    console.warn(`Config file not found: ${configPath}. Using environment variables only.`);
  }

  const appConfig = {};

  for (let key in process.env) {
    if (!key.startsWith('ROADMAP_')) {
      continue;
    }

    appConfig[key.replace('ROADMAP_', '')] = process.env[key];
  }

  return appConfig;
};

const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)?$/,
  options: {
    rehypePlugins: [rehypePrism]
  }
});

let nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: loadConfig(process.env.NODE_ENV),

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
