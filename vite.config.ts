import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Enable fast refresh only during dev (`vite dev`).
  // This ensures the react-refresh runtime is not injected into production bundles.
  plugins: [react(({ fastRefresh: command === 'serve' } as unknown) as Parameters<typeof react>[0])],
}))
