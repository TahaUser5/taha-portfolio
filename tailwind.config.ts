import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        sans: ['var(--font-jakarta)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        accent: '#8B5CF6',
        'accent-light': '#C4B5FD',
        'accent-dark': '#7C3AED',
        electric: '#00FF94',
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(109, 40, 217, 0.12)',
        glow: '0 0 40px rgba(109, 40, 217, 0.18)',
        'glow-lg': '0 0 80px rgba(109, 40, 217, 0.25)',
        electric: '0 0 24px rgba(0, 255, 148, 0.35)',
      },
      animation: {
        cursor: 'blink 1s step-end infinite',
        float: 'float 7s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'grid-violet':
          'linear-gradient(rgba(139,92,246,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.07) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '64px 64px',
      },
    },
  },
  plugins: [],
};

export default config;
