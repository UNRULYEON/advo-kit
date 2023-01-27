import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import alias from '@rollup/plugin-alias';
import path from 'path';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [
    react(),
    alias({
      entries: {
        '@components': path.resolve(__dirname, './src/components'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@icons': path.resolve(__dirname, './src/icons'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@kits': path.resolve(__dirname, './src/kits.ts'),
      },
    }),
  ],
});
