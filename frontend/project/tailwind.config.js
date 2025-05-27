/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#3B82F6',
          50: '#EBF2FF',
          100: '#D1E2FF',
          200: '#A3C5FF',
          300: '#75A8FF',
          400: '#478BFD',
          500: '#3B82F6',
          600: '#0F56D9',
          700: '#0A3EA0',
          800: '#072967',
          900: '#03132E',
        },
        'secondary': {
          DEFAULT: '#14B8A6',
          50: '#E7FAF7',
          100: '#C3F2EC',
          200: '#8AE5D9',
          300: '#51D7C7',
          400: '#26C4B4',
          500: '#14B8A6',
          600: '#108F81',
          700: '#0B665C',
          800: '#063E38',
          900: '#021615',
        },
        'accent': {
          DEFAULT: '#F97316',
          50: '#FEF2EA',
          100: '#FDDFCA',
          200: '#FBC095',
          300: '#FAA060',
          400: '#F9812B',
          500: '#F97316',
          600: '#D1560B',
          700: '#9C4008',
          800: '#672A05',
          900: '#321503',
        },
        'success': {
          DEFAULT: '#22C55E',
          500: '#22C55E',
        },
        'warning': {
          DEFAULT: '#F59E0B',
          500: '#F59E0B',
        },
        'error': {
          DEFAULT: '#EF4444',
          500: '#EF4444',
        },
        'dark': {
          DEFAULT: '#121212',
          50: '#2E2E2E',
          100: '#272727',
          200: '#232323',
          300: '#1E1E1E',
          400: '#171717',
          500: '#121212',
          600: '#0D0D0D',
          700: '#080808',
          800: '#030303',
          900: '#000000',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}