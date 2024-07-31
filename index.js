const configDefault = require('./configs/default');
const configTypescript = require('./configs/typescript');
const ignores = require('./ignores');

module.exports = {
  ignores,
  /** @type import('eslint').Linter.Config[] */
  configs: [configDefault, ...configTypescript]
};
