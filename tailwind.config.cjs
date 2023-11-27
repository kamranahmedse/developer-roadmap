/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,svg}'],
  theme: {
    fontFamily: {
      'sans':['ui-sans-serif', 'system-ui'],
      'poppins': ['Poppins', 'sans-serif'],
      'Dancing Script': ['Dancing Script', 'cursive'],
    },
    extend: {
      fontFamily: {
        Dance: ["Dancing Script", "cursive"],
        Rogue: ['Rouge Script', 'cursive'],
        dalena: ['Dalena', 'cursive'],
       },

      typography: {
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
