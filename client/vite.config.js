import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compress from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    compress({ // Compress assets to reduce bundle size
      algorithm: 'brotliCompress', // Options: 'gzip', 'brotliCompress'
      ext: '.br', // Output extension
    }),
  ],
  css: {
    minify: true, // Minify CSS for production builds
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/global.scss";`, // If using SCSS, import global styles
      },
    },
  },
  build: {
    minify: 'esbuild', // Minify JavaScript using esbuild
    chunkSizeWarningLimit: 1000, // Adjust chunk size warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          // Customize chunk splitting
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },

});