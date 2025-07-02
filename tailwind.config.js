// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media', // ✅ enables class-based dark mode
  theme: {
    extend: {
      colors: {
        darkCustom: '#252525',
      },
    },
  },
  plugins: [],
};
