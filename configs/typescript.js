const pluginImport = require('eslint-plugin-import');
const tseslint = require('typescript-eslint');

/** @type import('eslint').Linter.Config */
module.exports = [
  ...tseslint.configs.recommended.map(config => ({ ...config, files: ['**/*.ts', '**/*.tsx'] })),
  {
    name: '@eduzz/eslint-config-typescript',
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      ...pluginImport.configs.typescript.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_?(err|error|e)$'
        }
      ],
      '@typescript-eslint/adjacent-overload-signatures': ['error'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allowSingleOrDouble'
        },
        {
          selector: 'parameter',
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'allow'
        },
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'allowSingleOrDouble'
        },
        {
          selector: 'typeLike',
          format: ['camelCase', 'PascalCase']
        }
      ],
      '@typescript-eslint/member-ordering': ['error'],
      '@typescript-eslint/no-namespace': ['error'],
      '@typescript-eslint/no-object-literal-type-assertion': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/explicit-member-accessibility': ['error', { overrides: { constructors: 'no-public' } }]
    }
  }
];
