const configReactNative = require('./configs/react-native');
const { configs } = require('./react');

const ignores = require('./ignores');

module.exports = {
  ignores,
  /** @type import('eslint').Linter.Config[] */
  configs: [...configs, configReactNative]
};
