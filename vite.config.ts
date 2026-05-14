import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ReactInspector from 'vite-plugin-react-inspector'

export default defineConfig({
  plugins: [
    react(),
    ReactInspector(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
