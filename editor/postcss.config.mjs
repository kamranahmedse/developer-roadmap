export default {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-replace': {
      pattern: /(--tw|\*, ::before, ::after)/g,
      data: {
        '--tw': '--rdm-tw',
        '*, ::before, ::after': ':root',
      },
    },
  },
};
