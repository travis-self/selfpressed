import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command, mode}) => {
  const env = loadEnv(mode, process.cwd());

  return {
    define: {
      'process.env': {}
    },
    plugins: [
      react(),
      tailwindcss()
    ],
  }
})
