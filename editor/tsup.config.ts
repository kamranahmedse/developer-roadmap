import { defineConfig, Options } from 'tsup';

const packageOptions: Options = {
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  platform: 'neutral',
  sourcemap: true,
};

export default defineConfig([
  {
    ...packageOptions,
    entry: {
      index: 'src/index.tsx',
    },
    external: ['react'],
    outExtension(ctx) {
      return ctx.format === 'esm' ? { js: '.mjs' } : { js: '.js' };
    },
  },
]);
