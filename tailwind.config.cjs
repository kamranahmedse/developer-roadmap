/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,svg}',
    './editor/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,svg}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  safelist: ['overflow-hidden'],
  theme: {
    extend: {
      typography: {
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
      },
      keyframes: {
        'fade-slide-up': {
          '0%': {
            opacity: '0',
            transform: 'translateX(var(--tw-translate-x, 0)) translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(var(--tw-translate-x, 0)) translateY(0)',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        spotlight: {
          '0%': {
            opacity: 0,
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: 1,
            transform: 'translate(-50%,-40%) scale(1)',
          },
        },
        wiggle: {
          '0%': { transform: 'rotate(-4deg)' },
          '20%': { transform: 'rotate(4deg)' },
          '40%': { transform: 'rotate(-3deg)' },
          '60%': { transform: 'rotate(3deg)' },
          '80%': { transform: 'rotate(-2deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        'fade-slide-up':
          'fade-slide-up 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in': 'fade-in 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        spotlight: 'spotlight 2s ease 0.25s 1 forwards',
        wiggle: 'wiggle 0.5s ease-in-out forwards',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
