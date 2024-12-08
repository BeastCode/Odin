/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: {
          50: '#f0f4fd',
          100: '#d9e2f9',
          200: '#b8c9f4',
          300: '#8aa3ec',
          400: '#607de1',
          500: '#4361d3',
          600: '#3449b5',
          700: '#2c3b92',
          800: '#283477',
          900: '#1a2046',
          950: '#0d1025',
        },
        neon: {
          50: '#edfcfc',
          100: '#d5f7f8',
          200: '#b1eff2',
          300: '#7ce2e8',
          400: '#41cbd5',
          500: '#26adb8',
          600: '#238b9b',
          700: '#236f7d',
          800: '#235b67',
          900: '#214b56',
          950: '#0f2c34',
        },
      },
    },
  },
  plugins: [],
};
