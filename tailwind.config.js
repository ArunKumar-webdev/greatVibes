/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily:{ 
        poppins : ['Poppins', 'sans-serif']
      },
      colors : {
        "dark" : "#212121",
        "light" : "#4D4D4D",
        "button-primary"  :"#1597E4D4",
        "outline"  :"#E6E6E6",
        "background" : "#D8D8D8",
        "place-color" : "#7A7A7A",
        "error" : '#D86161'
      }
    },
    container: {
      center: true,
    },
    variants: {
      extend: {
        backgroundColor: ['active'],
      },
    },
  },
  plugins: [],
}

