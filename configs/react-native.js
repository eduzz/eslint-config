const { fixupPluginRules } = require('@eslint/compat');
const pluginReactNative = require('eslint-plugin-react-native');

module.exports = {
  name: '@eduzz/eslint-config-react-native',
  plugins: {
    'react-native': fixupPluginRules(pluginReactNative)
  },
  rules: {
    'react-native/no-inline-styles': ['warn'],
    'react-native/no-unused-styles': ['error']
  }
};
