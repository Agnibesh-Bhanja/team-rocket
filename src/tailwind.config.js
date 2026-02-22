/** tailwind.config.js **/
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['"Orbitron"', 'sans-serif'],
        ptsans: ['"PT Sans"', 'sans-serif'],
      },
      colors: {
        pokeBlue: '#3b82f6',
        pokeYellow: '#facc15',
        pokeLightGreen: '#bbf7d0',
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};