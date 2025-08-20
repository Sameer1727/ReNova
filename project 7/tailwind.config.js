/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f5ff',
          100: '#ebebff',
          200: '#d6d6ff',
          300: '#b8b8ff',
          400: '#9999ff',
          500: '#7a7aff',
          600: '#5c5cff',
          700: '#3d3dff',
          800: '#2D2F91',
          900: '#1f1f66',
        },
        accent: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#8A4FFF',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        gold: {
          50: '#fffdf0',
          100: '#fffaeb',
          200: '#fff3c4',
          300: '#ffec9d',
          400: '#ffe066',
          500: '#FFC857',
          600: '#f59e0b',
          700: '#d97706',
          800: '#b45309',
          900: '#92400e',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        }
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'cta-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }
    },
  },
  plugins: [],
};
