const configReact = require('./configs/react');
const configReactTailwind = require('./configs/react-tailwind');

const ignores = require('./ignores');
const { configs } = require('./index');

module.exports = {
  ignores,
  /** @type import('eslint').Linter.Config[] */
  configs: [...configs, configReact, configReactTailwind]
};
