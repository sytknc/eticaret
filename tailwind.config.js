/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Professional Fonts
      fontFamily: {
        'sans': ['Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'display': ['Poppins', 'Inter', 'Segoe UI', 'sans-serif'],
        'heading': ['Montserrat', 'Inter', 'Segoe UI', 'sans-serif'],
        'body': ['Inter', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      // Enhanced breakpoints
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      // Enhanced colors
      colors: {
        amber: {
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
      }
    },
  },
  plugins: [],
  // Enable experimental features for better browser support
  future: {
    hoverOnlyWhenSupported: true,
  }
}
