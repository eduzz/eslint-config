const { fixupPluginRules } = require('@eslint/compat');
const stylistic = require('@stylistic/eslint-plugin');
const pluginImport = require('eslint-plugin-import');
const pluginUnusedImports = require('eslint-plugin-unused-imports');

/** @type import('eslint').Linter.Config */
module.exports = {
  name: '@eduzz/eslint-config-defaults',
  settings: {
    'import/internal-regex': '(^@eduzz|react|^@nestjs|^~)'
  },
  plugins: {
    '@stylistic': stylistic,
    'import': fixupPluginRules(pluginImport),
    'unused-imports': pluginUnusedImports
  },
  languageOptions: {
    parserOptions: {
      ecmaVersion: 10,
      sourceType: 'module',
      ecmaFeatures: { modules: true, jsx: true }
    }
  },
  rules: {
    ...stylistic.configs.recommended.rules,
    ...pluginImport.configs.recommended.rules,
    'no-restricted-globals': ['error'],
    'object-shorthand': ['error', 'always', { avoidQuotes: true }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['block-like', 'function'], next: '*' },
      { blankLine: 'always', prev: ['*'], next: ['block-like', 'function'] },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'any', prev: ['export', 'import'], next: ['export', 'import'] },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['export'] }
    ],
    'no-restricted-imports': [
      'error',
      'date-fns',
      'mdi-react',
      'lodash',
      '@material-ui/core',
      '@material-ui/styles',
      '@mui/material',
      '@mui/system',
      '@mui/styles'
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: "VariableDeclarator > Identifier[name='process']",
        message: 'process is a reserved name for NodeJS Enviroment'
      }
    ],
    'max-lines': ['error', 300],
    'max-len': ['off'],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-trailing-spaces': ['error'],
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_?(err|error|e)$'
      }
    ],
    'prefer-const': ['error', { destructuring: 'all' }],
    'no-extra-semi': ['error'],
    'no-var': ['error'],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'eqeqeq': 0,
    'quote-props': 'off',
    'no-useless-escape': 'off',
    'import/no-unresolved': 'off',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'import/no-cycle': 'off',
    'import/no-deprecated': 'off',
    'import/no-unused-modules': 'off',
    'import/first': 'error',
    'import/order': [
      'error',
      {
        'alphabetize': { order: 'asc', caseInsensitive: true },
        'groups': ['builtin', ['external', 'internal'], ['parent', 'sibling', 'index'], 'object'],
        'newlines-between': 'always',
        'pathGroupsExcludedImportTypes': ['react', 'antd'],
        'pathGroups': [
          { pattern: 'react**', group: 'builtin', position: 'before' },
          { pattern: 'antd', group: 'builtin' },
          { pattern: 'antd/**', group: 'builtin' },
          { pattern: '@ant-design/**', group: 'builtin' },
          { pattern: '@nestjs/**', group: 'external', position: 'before' },
          { pattern: '@eduzz/**', group: 'internal', position: 'after' },
          { pattern: '@myeduzz-vertical/**', group: 'internal', position: 'after' },
          { pattern: '~/**', group: 'internal', position: 'after' },
          { pattern: '@/**', group: 'internal', position: 'after' }
        ]
      }
    ],
    'unused-imports/no-unused-imports': 'error',
    '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
    '@stylistic/jsx-quotes': ['error', 'prefer-single'],
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/comma-dangle': ['error', 'never'],
    '@stylistic/arrow-parens': ['error', 'as-needed'],
    '@stylistic/object-curly-spacing': ['error', 'always'],
    '@stylistic/indent': ['error', 2, { VariableDeclarator: 'first', outerIIFEBody: 1, MemberExpression: 1, ArrayExpression: 1, flatTernaryExpressions: true, offsetTernaryExpressions: true }],
    '@stylistic/max-len': ['error', { code: 120, ignoreTemplateLiterals: true, ignoreStrings: true, ignoreComments: true }],
    '@stylistic/quote-props': ['error', 'consistent'],
    '@stylistic/eol-last': ['error', 'always'],
    '@stylistic/no-trailing-spaces': 'error',
    '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],
    '@stylistic/jsx-first-prop-new-line': ['error', 'multiline'],
    '@stylistic/no-multi-spaces': ['error'],
    '@stylistic/key-spacing': ['error'],
    '@stylistic/operator-linebreak': ['error', 'after'],
    '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    '@stylistic/member-delimiter-style': ['error', {
      multiline: { delimiter: 'semi', requireLast: true },
      singleline: { delimiter: 'semi', requireLast: false },
      multilineDetection: 'brackets'
    }],
    '@stylistic/jsx-one-expression-per-line': 'off',
    '@stylistic/indent-binary-ops': ['error', 4],
    '@stylistic/jsx-wrap-multilines': ['error', {
      declaration: 'parens',
      assignment: 'parens',
      return: 'parens',
      arrow: 'parens',
      condition: 'ignore',
      logical: 'ignore',
      prop: 'ignore',
      propertyValue: 'ignore'
    }],
    '@stylistic/quote-props': ['error', 'consistent-as-needed'],
    '@stylistic/indent-binary-ops': 'off',
    '@stylistic/comma-dangle': ['error', 'never'],
    '@stylistic/object-curly-newline': ['error', { multiline: true, consistent: true }],
    '@stylistic/multiline-ternary': ['error', 'always-multiline', { ignoreJSX: true }],
    '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before', '|': 'before' } }]
  }
};
