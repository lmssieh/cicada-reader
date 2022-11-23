import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn } from 'vite-plugin-monkey';
import WindiCSS from 'vite-plugin-windicss'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  plugins: [
    vue(),
    WindiCSS(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: [
          '*://novelfull.com/*',
          '*://secondlifetranslations.com/*',
          '*://novelhall.com/*'
        ],
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
          // https://cdn.jsdelivr.net/npm/@mozilla/readability@0.4.2/Readability.js
          readability: cdn.jsdelivr('@mozilla/readability', 'Readability.js'),
        },
      },
    }),
  ],
});
