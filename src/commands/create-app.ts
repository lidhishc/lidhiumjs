import * as fs from "fs";

import {
  copyFolder,
  createFile,
  createFolder,
  installDependencies,
  updatePackageJsonName,
} from "../file-manager";

import chalk from "chalk";

export async function createApp(
  appName: string,
  parentAppName?: string,
  byPassConfigFileCheck: boolean = false
) {
  if (!(byPassConfigFileCheck || parentAppName)) {
    if (!fs.existsSync(`${parentAppName}/lidhvue.config.json`)) {
      console.error(
        chalk.red(`lidhvue.config.js not found in ${appName}`),
        "Please run `lidhvue init` to create a new app"
      );
      return;
    }
  } else {
    console.log(chalk.yellow(`Bypassing config file check`));
  }
  let fileContent = fs.readFileSync(
    `${parentAppName}/lidhvue.config.json`,
    "utf8"
  );

  console.log(fileContent);

  const config = JSON.parse(fileContent);

  const { name } = config;

  console.log(chalk.green(`Creating app ${appName}`));
  createFolder(`${name}/apps/${appName}`);

  console.log(chalk.green(`Copying boilerplate files`));
  copyFolder(`../static/vue3`, `${name}/apps/${appName}`);

  updatePackageJsonName(`${name}/apps/${appName}/package.json`, `${appName}`);
  console.log(chalk.green(`Installing dependencies`));

  createFile(
    `${name}/apps/${appName}/install.sh`,
    `#!/bin/bash
    yarn install
  `
  );

  fs.chmodSync(`${name}/apps/${appName}/install.sh`, "755");

  await installDependencies(`${name}/apps/${appName}`);

  console.log(chalk.green(`App ${appName} created successfully`));
}

// async function installDependencies(appName: string) {
//   try {
//     await execa("sh", [`${appName}/install.sh`]);
//     console.log("Dependencies installed successfully!");
//   } catch (error) {
//     console.error("Failed to install dependencies:", error);
//   }
// }
