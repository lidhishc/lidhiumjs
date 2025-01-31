import * as fs from "fs";

import {
  copyFolder,
  createFolder,
  updatePackageJsonName,
} from "../file-manager";

import chalk from "chalk";

export async function createApp(
  appName: string,
  parentAppName?: string,
  init: boolean = false
) {
  let fileContent = {} as any;
  if (!init) {
    let isFileExist = false;
    isFileExist = fs.existsSync(`./lidhvue.config.json`);
    if (!isFileExist) {
      console.error(
        chalk.red(`lidhvue.config.js not found`),
        chalk.green(`Run ${chalk.magenta(`'lidhro init'`)}`)
      );
      return;
    }

    fileContent = fs.readFileSync(`./lidhvue.config.json`, "utf8");
  } else {
    fileContent = fs.readFileSync(
      `${parentAppName}/lidhvue.config.json`,
      "utf8"
    );
  }

  const config = JSON.parse(fileContent);

  const { name } = config;

  if (init) {
    console.log(chalk.green(`Creating app ${appName}`));
    createFolder(`${name}/apps/${appName}`);
    copyFolder(`../static/vue3`, `${name}/apps/${appName}`);
    updatePackageJsonName(`${name}/apps/${appName}/package.json`, `${appName}`);
    console.log(chalk.green(`App ${appName} created successfully`));
    console.log(`\n`);
    return;
  } else {
    console.log(chalk.green(`Creating app ${appName}`));
    createFolder(`./apps/${appName}`);
    copyFolder(`../static/vue3`, `./apps/${appName}`);
    updatePackageJsonName(`./apps/${appName}/package.json`, `${appName}`);
    console.log(chalk.green(`App ${appName} created successfully`));
    console.log(`\n`);
    console.log(chalk.yellow(`Install dependencies`));
    console.log(`\n\n`);
  }
}

// async function installDependencies(appName: string) {
//   try {
//     await execa("sh", [`${appName}/install.sh`]);
//     console.log("Dependencies installed successfully!");
//   } catch (error) {
//     console.error("Failed to install dependencies:", error);
//   }
// }
