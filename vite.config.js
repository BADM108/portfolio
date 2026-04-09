import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import profilePic from './assets/pfp.jpg';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
