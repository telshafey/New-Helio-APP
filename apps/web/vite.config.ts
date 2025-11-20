import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Map the shared package alias to the source directory
      '@helio/shared-logic': path.resolve(__dirname, '../../packages/shared-logic/src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
          recharts: ['recharts'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    fs: {
        allow: ['../..'], // Allow serving files from the workspace root
    },
  },
});