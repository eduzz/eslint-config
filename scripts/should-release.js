/* eslint-disable @typescript-eslint/no-require-imports */
const childProccess = require('child_process');

const globalPackages = childProccess.execSync('npm root -g').toString().trim();
const semver = require(`${globalPackages}/semver`);

const package = require('../package.json');

async function init() {
  if (!semver.valid(package.version)) {
    throw new Error(`Invalid Version: ${package.version}`);
  }

  console.log('NEW VERSION:' + package.version);

  const remoteVersion = await exec(`npm view ${package.name} version`);
  package.remoteVersion = remoteVersion;

  console.log(`REMOTE VERSIONS: ${package.remoteVersion}`);

  const isGreater = semver.gt(package.version, package.remoteVersion);

  if (!isGreater) {
    console.log('Version already published, skipping...');
    await exec('echo true > .skip-release');
    return;
  }

  await exec('echo false > .skip-release');
}

function exec(command, live) {
  return new Promise((resolve, reject) => {
    const cmd = childProccess.exec(command, { env: { ...process.env } }, (err, stdout) => {
      if (err) reject(err);
      resolve(stdout?.trim());
    });

    if (!live) return;
    cmd.stdout.on('data', data => console.log(data.toString()));
  });
}

init()
  .then(() => {
    console.log(`NEW VERSION CAN BE PUBLISHED: ${package.version}`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(-1);
  });
