module.exports = {
  singleQuote: true,
  jsxSingleQuote: true,
  quoteProps: 'consistent',
  trailingComma: 'none',
  useTabs: false,
  tabWidth: 2,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'auto',
  printWidth: 120,
  semi: true,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['tw', 'clsx']
};
