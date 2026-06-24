import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0B0C',
        char: '#141314',
        'char-2': '#1A1818',
        oxblood: '#7A1F2B',
        'oxblood-deep': '#591521',
        brass: '#C9A36A',
        'brass-soft': '#E2C892',
        bone: '#F4EFE6',
        ash: '#A8A29A',
        ember: '#E2873B',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterspacing: {},
      maxWidth: {
        content: '72rem',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'ken-burns': {
          '0%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1.16)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'ken-burns': 'ken-burns 22s ease-out forwards',
      },
    },
  },
  plugins: [],
} satisfies Config;
