/** @type {import('postcss-load-config').Config} */
const config = {
'postcss-custom-media': {
      importFrom: [
        {
          customMedia: {
            '--max-sm': '(max-width: 639px)'
          }
        }
      ]
    },
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
export default config;