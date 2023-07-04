const childProccess = require('child_process');

const globalPackages = childProccess.execSync('npm root -g').toString().trim();
const semver = require(`${globalPackages}/semver`);

const packageJson = require('../package.json');

async function init() {
  if (!semver.valid(packageJson.version)) {
    throw new Error(`Invalid Version: ${packageJson.version}`);
  }

  console.log('NEW VERSION:' + packageJson.version);

  const remoteVersion = await exec(`npm view ${packageJson.name} version`);
  packageJson.remoteVersion = remoteVersion;

  console.log(`REMOTE VERSIONS: ${packageJson.remoteVersion}`);

  const isGreater = semver.gt(packageJson.version, packageJson.remoteVersion);

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
      resolve(stdout.trim());
    });

    if (!live) return;
    cmd.stdout.on('data', data => console.log(data.toString()));
  });
}

init()
  .then(() => {
    console.log(`NEW VERSION CAN BE PUBLISHED: ${packageJson.version}`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(-1);
  });
