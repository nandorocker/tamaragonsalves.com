/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative: true,
    transform: (content) => content.replace(/taos:/g, ""),
    files: [
      "./src/**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
    ],
  },
  theme: {
    fontFamily: {
      sans: ["Work Sans", "regular"],
    },
    extend: {
      boxShadow: {
        "sm-flat-r": "2px 2px 0 rgb(0 0 0 / 1)",
        "sm-flat-l": "-2px -2px 0 rgb(0 0 0 / 1)",
        "flat-r": "4px 4px 0 rgb(0 0 0 / 1)",
        "flat-l": "-4px -4px 0 rgb(0 0 0 / 1)",
        "md-flat-r": "6px 6px 0 rgb(0 0 0 / 1)",
        "md-flat-l": "-6px -6px 0 rgb(0 0 0 / 1)",
        "lg-flat-r": "8px 8px 0 rgb(0 0 0 / 1)",
        "lg-flat-l": "-8px -8px 0 rgb(0 0 0 / 1)",
        "xl-flat-r": "10px 10px 0 rgb(0 0 0 / 1)",
        "xl-flat-l": "-10px -10px 0 rgb(0 0 0 / 1)",
        "2xl-flat-r": "12px 12px 0 rgb(0 0 0 / 1)",
        "2xl-flat-l": "-12px -12px 0 rgb(0 0 0 / 1)",
        "inner-flat-r": "inset 4px 4px 0 rgb(0 0 0 / 1)",
        "inner-flat-l": "inset -4px -4px 0 rgb(0 0 0 / 1)",
      },
      colors: {
        lavender: {
          DEFAULT: "#c6c2f2",
          100: "#eceaf9",
          200: "#d9d7f4",
          300: "#c6c2f2", // same as DEFAULT
          400: "#a6a2e5",
          500: "#8b86da",
          600: "#7e7bd1",
          700: "#5c5bad",
          800: "#45438a",
          900: "#312f63",
        },
        obsidian: {
          DEFAULT: "#262628",
          100: "#f3f3f3",
          200: "#cfcfd1",
          300: "#a5a5a9",
          400: "#7c7c81",
          500: "#525259",
          600: "#3d3d42",
          700: "#262628", // same as DEFAULT
          800: "#1b1b1c",
          900: "#0f0f10",
        },
        cream: {
          DEFAULT: "#fff6ee",
          100: "#fffaf7",
          200: "#ffefe2",
          300: "#ffe4cf",
          400: "#ffd9b9",
          500: "#fff6ee", // same as DEFAULT
          600: "#f5d4a7",
          700: "#e1a25e",
          800: "#c7834b",
          900: "#a56a3b",
        },
        lime: {
          DEFAULT: "#d6dc82",
          100: "#f5f7e4",
          200: "#ecf0c8",
          300: "#e0e6a9",
          400: "#ccd474",
          500: "#d6dc82", // same as DEFAULT
          600: "#b1b866",
          700: "#8e964c",
          800: "#616d22",
          900: "#4e591a",
        },
        cherry: {
          DEFAULT: "#d86072",
          100: "#f7e8ea",
          200: "#f1c4c9",
          300: "#e7989d",
          400: "#e16e7b",
          500: "#d86072", // same as DEFAULT
          600: "#ba4859",
          700: "#943944",
          800: "#6c2930",
          900: "#4f1d23",
        },
      },
      borderWidth: {
        6: "6px",
      },
      borderRadius: {
        xl: "1rem",
      },
      height: {
        "10vh": "10vh",
        "20vh": "20vh",
        "30vh": "30vh",
        "40vh": "40vh",
        "50vh": "50vh",
        "60vh": "60vh",
        "70vh": "70vh",
        "80vh": "80vh",
        "90vh": "90vh",
        "100vh": "100vh",
      },
      minHeight: {
        "10vh": "10vh",
        "20vh": "20vh",
        "30vh": "30vh",
        "40vh": "40vh",
        "50vh": "50vh",
        "60vh": "60vh",
        "70vh": "70vh",
        "80vh": "80vh",
        "90vh": "90vh",
        "100vh": "100vh",
      },
      maxHeight: {
        "10vh": "10vh",
        "20vh": "20vh",
        "30vh": "30vh",
        "40vh": "40vh",
        "50vh": "50vh",
        "60vh": "60vh",
        "70vh": "70vh",
        "80vh": "80vh",
        "90vh": "90vh",
        "100vh": "100vh",
      },
      maxWidth: {
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("taos/plugin")],
  safelist: [
    "!duration-[0ms]",
    "!delay-[0ms]",
    'html.js :where([class*="taos:"]:not(.taos-init))',
  ],
};

// see https://tailwindcss.com/docs/configuration