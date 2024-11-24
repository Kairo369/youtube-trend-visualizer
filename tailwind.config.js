/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        'glow': '0 0 10px rgba(255,255,255,0.5)',
      },
      boxShadow: {
        'glow': '0 0 8px rgba(255,255,255,0.5)',
      },
      colors: {
        primary: '#6B46C1',
        secondary: '#4A5568',
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    },
  ],
}
