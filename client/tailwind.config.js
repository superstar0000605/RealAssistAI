/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
        backgroundImage: theme => ({
            'logo-mark': "url('/assists/svgs/logo-mark.svg')"
        }),
        fontFamily: {
            'manrope': 'Manrope'
        }
    },
  },
  plugins: [],
}
