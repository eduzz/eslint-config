const configReactNative = require('./configs/react-native');
const { configs } = require('./react');
const { fixupPluginRules } = require('@eslint/compat');
const pluginReactNative = require('eslint-plugin-react-native');

const ignores = require('./ignores');

module.exports = {
  ignores,
  /** @type import('eslint').Linter.Config[] */
  configs: [...configs, configReactNative]
};
