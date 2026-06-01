import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: false,
  clean: true,
  sourcemap: false,
  treeshake: true,
  target: 'node18',
  platform: 'node',
  splitting: false,
  shims: false,
});
