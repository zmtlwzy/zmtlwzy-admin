// #!/usr/bin/env node

import { runBuildConfig } from './buildConf';
import pc from 'picocolors';

import pkg from '../../package.json';

export const runBuild = async () => {
  try {
    const argvList = process.argv.splice(2);

    // Generate configuration file
    if (!argvList.includes('disabled-config')) {
      runBuildConfig();
    }

    console.log(`✨ ${pc.cyan(`[${pkg.name}]`)}` + ' - build successfully!');
  } catch (error) {
    console.log(pc.red('vite build error:\n' + error));
    process.exit(1);
  }
};
runBuild();
