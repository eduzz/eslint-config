
try {
  const tailwind =  require('eslint-plugin-tailwindcss');

  /** @type import('eslint').Linter.Config */
  module.exports = {
    name: '@eduzz/eslint-config-react-tailwind',
    plugins: {
      'tailwindcss': tailwind
    },
    rules: {
      'tailwindcss/classnames-order': ['error', { callees : ['classnames', 'tw', 'clsx', 'ctl', 'cva', 'tv', 'cn', 'cx'] }]
    }
  };
} catch (error) {
  console.warn('⚠️ tailwindcss not found, Tailwind formatting disabled:', error.message);

  /** @type import('eslint').Linter.Config */
  module.exports = {
    name: '@eduzz/eslint-config-react-tailwind'
  };
}
