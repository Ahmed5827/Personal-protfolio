/** @type {import('postcss-load-config').Config} */
const config = {
  theme: {
    extend: {
      screens: {
        'xs': '480px', // Now you can use `xs:` prefix in classes
      },
    },
  },
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
export default config;