const configReact = require('./configs/react');

const ignores = require('./ignores');
const { configs } = require('./index');

module.exports = {
  ignores,
  /** @type import('eslint').Linter.FlatConfig[] */
  configs: [...configs, configReact]
};
