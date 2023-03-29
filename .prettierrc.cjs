module.exports = {
  semi: true,
  singleQuote: true,
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
        singleQuote: true,
        jsxSingleQuote: true,
      },
    },
  ],
  plugins: [
    require.resolve('prettier-plugin-astro'),
    require('prettier-plugin-tailwindcss'),
  ],
};
