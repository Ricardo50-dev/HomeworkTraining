import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000, // aqui você define a porta
  },
  plugins: [
    tailwindcss(),
    react()
  ],
})
