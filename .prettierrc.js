module.exports = {
  printWidth: 120,
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
}