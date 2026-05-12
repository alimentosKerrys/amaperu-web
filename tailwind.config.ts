import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ama: {
          green: '#8DC63F',
          'green-dark': '#6BA32E',
          'green-light': '#A8D65A',
          black: '#1A1A1A',
          gray: {
            dark: '#2D2D2D',
            mid: '#4A4A4A',
            light: '#F5F5F5',
          },
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        barlow: ['Barlow', 'sans-serif'],
        'barlow-condensed': ['Barlow Condensed', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

export default config
