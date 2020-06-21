const path = require('path');
const fs = require('fs');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const rehypePrism = require('@mapbox/rehype-prism');
const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)?$/,
  options: {
    rehypePlugins: [rehypePrism],
  },
});

const { getPathMap } = require("./scripts/path-map");

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

const options = {
  exportPathMap: getPathMap(),
  env: loadConfig(process.env.NODE_ENV),
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

let nextConfig = withSass(options);
nextConfig = withCSS(nextConfig);
nextConfig = withMDX(nextConfig);

module.exports = nextConfig;
