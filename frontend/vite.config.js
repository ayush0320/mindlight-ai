import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  preview: {
    port: 5173,
  },
  // This ensures that all routes are served with index.html
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});