import { defineConfig } from 'vite'
import { resolve } from 'path'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
      output: {
        manualChunks: {
          vendor: ['bootstrap', 'swiper', 'glightbox', 'flatpickr', 'imask'],
        },
        assetFileNames: ({ name }) => {
          if (/\.(woff|woff2)$/.test(name)) {
            return 'assets/fonts/[name][extname]'
          }
          if (/\.(png|jpe?g|gif|webp|svg)$/.test(name)) {
            return 'assets/img/[name][extname]'
          }
          if (/\.css$/.test(name)) {
            return 'assets/css/[name][extname]'
          }
          if (/\.webmanifest$/.test(name)) {
            return '[name][extname]'
          }
          return 'assets/[ext]/[name][extname]'
        },
        chunkFileNames: 'assets/js/[name].js',
        entryFileNames: 'assets/js/[name].js',
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  preview: {
    port: 4173,
    strictPort: true,
    host: true,
    open: true
  },
  plugins: [
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
      includePublic: true,
      logStats: true,
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
                removeEmptyAttrs: false,
              },
            },
          },
        ],
      },
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        lossless: false,
        quality: 80,
        alphaQuality: 80,
        force: false,
      },
    })
  ]
})