import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['react-icons'],
          'vendor-misc': ['react-type-animation', 'react-scroll', '@emailjs/browser'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
    target: 'es2017',
    minify: 'esbuild',
    cssMinify: true,
    assetsInlineLimit: 4096,
  },
})
