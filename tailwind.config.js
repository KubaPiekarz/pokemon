module.exports = {
    purge: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
      colors: {
        // Using modern `rgb`
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        primaryDark: 'rgb(var(--color-primaryDark) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        light: 'rgb(var(--color-light) / <alpha-value>)',
        purple: 'rgb(var(--color-purple) / <alpha-value>)',
        lightGray: 'rgb(var(--color-lightGray) / <alpha-value>)',
        gray: 'rgb(var(--color-gray) / <alpha-value>)',
        darkGray: 'rgb(var(--color-darkGray) / <alpha-value>)',
        yellow: 'rgb(var(--color-yellow) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',


        
      }
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }
  