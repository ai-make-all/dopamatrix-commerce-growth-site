import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app.vue',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './data/**/*.{js,ts}',
    './types/**/*.ts'
  ],
  theme: {
    extend: {
      colors: {
        dopa: {
          bg: '#080A12',
          panel: '#101522',
          card: '#151B2E',
          border: '#26324A',
          text: '#F7F9FC',
          muted: '#9AA4B2',
          cyan: '#23D3EE',
          purple: '#8B5CF6',
          green: '#22C55E',
          amber: '#F59E0B'
        }
      },
      boxShadow: {
        glow: '0 0 40px rgba(35, 211, 238, 0.18)'
      }
    }
  },
  plugins: []
}
