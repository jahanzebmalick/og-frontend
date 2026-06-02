import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/signup': 'http://localhost:8080',
      '/login': 'http://localhost:8080',
      '/logout': 'http://localhost:8080',
      '/me': 'http://localhost:8080',
      '/feed': 'http://localhost:8080',
      '/explore': 'http://localhost:8080',
      '/posts': 'http://localhost:8080',
      '/follow': 'http://localhost:8080',
      '/unfollow': 'http://localhost:8080',
      '/users': 'http://localhost:8080',
      '/search': 'http://localhost:8080',
      '/profile': 'http://localhost:8080',
      '/og-status': 'http://localhost:8080',
    }
  }
})
