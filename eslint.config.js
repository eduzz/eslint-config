const { ignores, configs } = require('.');

module.exports = [...configs, { ignores: ignores() }];
