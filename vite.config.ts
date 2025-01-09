import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/React_page/',
  build: {
    outDir: 'dist',
    copyPublicDir: true
  }
});