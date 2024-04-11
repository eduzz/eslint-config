const { configs } = require('./react');
const pluginReactNative = require('eslint-plugin-react-native');

const ignores = require('./ignores');

module.exports = {
  ignores,
  /** @type import('eslint').Linter.FlatConfig[] */
  configs: [
    ...configs,
    {
      name: '@eduzz/eslint-config-react-native',
      plugins: {
        'react-native': pluginReactNative
      },
      rules: {
        'react-native/no-inline-styles': ['warn'],
        'react-native/no-unused-styles': ['error']
      }
    }
  ]
};
