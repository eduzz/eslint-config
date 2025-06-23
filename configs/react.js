const { fixupPluginRules } = require('@eslint/compat');
const pluginReact = require('eslint-plugin-react');
const pluginReactHooks = require('eslint-plugin-react-hooks');

const eduzzRules = require('../rules');

/** @type import('eslint').Linter.Config */
module.exports = {
  name: '@eduzz/eslint-config-react',
  settings: {
    react: { version: 'detect' }
  },
  plugins: {
    'react': pluginReact,
    'react-hooks': fixupPluginRules(pluginReactHooks),
    'eduzz-rules': eduzzRules
  },
  rules: {
    ...pluginReact.configs.recommended.rules,
    'react/display-name': ['off'],
    'react/prop-types': ['off'],
    'react/no-unescaped-entities': ['off'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      { additionalHooks: '(usePromise|usePromiseCallback|usePromiseEffect|usePromiseRefresh)' }
    ],
    'react/style-prop-object': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'eduzz-rules/jsx-valid-id': 'error',
    'eduzz-rules/jsx-required-id': 'error'
  }
};
