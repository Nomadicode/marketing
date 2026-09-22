import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FBF8F4',
        foreground: '#12161D',
        card: '#FDFBFA',
        'card-foreground': '#12161D',
        primary: '#9BB7F2',
        'primary-foreground': '#0F1624',
        secondary: '#E7EBF3',
        'secondary-foreground': '#12161D',
        canvas: '#FBF8F4',
        'canvas-raised': '#E7EBF3',
        border: '#D1D4DB',
        'border-strong': '#B8BEC8',
        accent: '#9BB7F2',
        'accent-foreground': '#0F1624',
        ink: '#12161D',
        muted: '#3E434B',
        'muted-foreground': '#3E434B',
        faint: '#5E646C',
        ring: '#9BB7F2',
        navy: '#0F1624',
        'navy-strong': '#080D18',
        'navy-foreground': '#F1F5FC',
        'navy-muted': '#B6BECB',
        'navy-border': '#3A4253',
        highlight: '#7C4523',
        'highlight-soft': '#FCEFE5',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      maxWidth: {
        shell: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
