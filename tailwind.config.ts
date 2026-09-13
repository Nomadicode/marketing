import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0b0d12',
        foreground: '#f5f6f8',
        card: '#12151c',
        'card-foreground': '#f5f6f8',
        primary: '#8aaae5',
        'primary-foreground': '#0b0d12',
        secondary: '#12151c',
        'secondary-foreground': '#f5f6f8',
        canvas: '#0b0d12',
        'canvas-raised': '#12151c',
        border: 'rgba(255,255,255,0.08)',
        'border-strong': 'rgba(255,255,255,0.14)',
        accent: '#8aaae5',
        ink: '#f5f6f8',
        muted: '#9aa4b8',
        'muted-foreground': '#9aa4b8',
        faint: '#6b7486',
        ring: '#8aaae5',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Helvetica', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        shell: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
