import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tiger colors
        tiger: {
          orange: '#FF6B35',
          dark: '#C44D2C',
          light: '#FFE5DB',
        },
        // Fortress colors
        fortress: {
          black: '#1A1D23',
          slate: '#2D3748',
          gray: '#4A5568',
          light: '#E2E8F0',
          white: '#FFFFFF',
        },
        // Semantic colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(26, 29, 35, 0.1)',
        'md': '0 4px 6px rgba(26, 29, 35, 0.1)',
        'lg': '0 10px 15px rgba(26, 29, 35, 0.1)',
        'xl': '0 20px 25px rgba(26, 29, 35, 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
