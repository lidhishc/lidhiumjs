import * as fs from "fs";

import { copyFolder, createFolder } from "../file-manager";

import chalk from "chalk";
import { updateAppConfig } from "../utils/common";

export async function createApp({
  appName,
  port,
}: {
  appName: string;
  port: number;
}) {
  let fileContent = {} as any;
  let isFileExist = false;
  isFileExist = fs.existsSync(`./lidhro.config.json`);
  if (!isFileExist) {
    console.error(
      chalk.red(`lidhro.config.json not found`),
      chalk.green(`Run ${chalk.magenta(`'lidhro init'`)}`)
    );
    return;
  }
  fileContent = fs.readFileSync(`./lidhro.config.json`, "utf-8");
  const config = JSON.parse(fileContent);

  // check if app already exists
  if (config.apps[appName]) {
    console.error(
      chalk.red(`App ${appName} already exists`),
      chalk.green(`Try another name`)
    );
    return;
  }

  // check app port is already in use
  for (const app in config.apps) {
    if (config.apps[app].port === port) {
      console.error(
        chalk.red(`Port ${config.port} already in use by ${app}`),
        chalk.green(`Try another port`)
      );
      return;
    }
  }

  console.log(chalk.green(`Creating app ${appName}`));
  createFolder(`./apps/${appName}`);
  copyFolder(`../static/vue3`, `./apps/${appName}`);

  if (!Object.keys(config.apps).length) {
    updateAppConfig({
      port,
      appType: "host",
      appName,
      currentConfig: config,
    });
  } else {
    updateAppConfig({
      port,
      appType: "remote",
      appName,
      currentConfig: config,
    });
  }

  console.log(chalk.green(`App ${appName} created successfully`));
  console.log(`\n`);
}

// async function installDependencies(appName: string) {
//   try {
//     await execa("sh", [`${appName}/install.sh`]);
//     console.log("Dependencies installed successfully!");
//   } catch (error) {
//     console.error("Failed to install dependencies:", error);
//   }
// }
