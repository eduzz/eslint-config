const path = require('path');

const config = {
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
  tailwindFunctions: ['tw', 'clsx']
};

try {
  require.resolve('prettier-plugin-tailwindcss', {
    paths: [path.dirname(require.resolve('@eduzz/eslint-config/package.json'))]
  });

  config.plugins = [
    require.resolve('prettier-plugin-tailwindcss', {
      paths: [path.dirname(require.resolve('@eduzz/eslint-config/package.json'))]
    })
  ];
} catch (error) {
  console.info('prettier-plugin-tailwindcss not found, Tailwind formatting disabled');
}

module.exports = config;
