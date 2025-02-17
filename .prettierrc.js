/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  useTabs: false,
  singleQuote: true,
  quoteProps: 'consistent',
  trailingComma: 'none',
  arrowParens: 'avoid',
  endOfLine: 'auto'
};
