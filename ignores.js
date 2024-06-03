const childProcess = require('child_process');
const fs = require('node:fs');

const parse = require('parse-gitignore');

module.exports = function gitignore(...extra) {
  const files = childProcess
    .execSync('git ls-files *.gitignore')
    .toString()
    .split('\n')
    .filter(file => !!file);

  const ignores = [];

  for (const file of files) {
    let content = '';

    try {
      content = fs.readFileSync(file, 'utf8');
    } catch (error) {
      continue;
    }

    const parsed = parse(`${content}\n`);
    const globs = parsed.globs();
    console.log(JSON.stringify(globs, null, 2));

    for (const glob of globs) {
      if (glob.type === 'ignore') ignores.push(...glob.patterns);
      else if (glob.type === 'unignore') ignores.push(...glob.patterns.map(pattern => `!${pattern}`));
    }
  }

  return [...ignores, ...extra];
};
