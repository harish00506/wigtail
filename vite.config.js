import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'backend/static/frontend'),
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: 'app.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'app.css';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    watch: {
      ignored: ['**/.venv/**']
    }
  }
});