import * as fs from "fs";

import { copyFolder, createFolder } from "../file-manager";

import { config as WebConfig } from "../config";
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
  isFileExist = fs.existsSync(`./lidhium.config.json`);
  if (!isFileExist) {
    console.error(
      chalk.red(`lidhium.config.json not found`),
      chalk.green(`Run ${chalk.magenta(`'lidhium init'`)}`)
    );
    console.log(
      chalk.green(
        `For more details visit ${chalk.magenta(
          `${WebConfig.docs.webUrl}/docs/getting-started#generate-micro-frontend`
        )}`
      )
    );
    return;
  }
  fileContent = fs.readFileSync(`./lidhium.config.json`, "utf-8");
  const config = JSON.parse(fileContent);

  // check if app already exists
  if (config.apps[appName]) {
    console.error(
      chalk.red(`App ${chalk.magenta(appName)} already exists`),
      chalk.green(`Try another name`)
    );
    console.log(
      chalk.green(
        `For more details visit ${chalk.magenta(
          `${WebConfig.docs.webUrl}/docs/getting-started#generate-micro-frontend`
        )}`
      )
    );
    return;
  }

  // check app port is already in use
  for (const app in config.apps) {
    if (config.apps[app].port === port) {
      console.error(
        chalk.red(
          `Port ${chalk.magenta(port)} already in use by ${chalk.magenta(app)}`
        ),
        chalk.green(`Try another port`)
      );
      console.log(
        chalk.green(
          `For more details visit ${chalk.magenta(
            `${WebConfig.docs.webUrl}/docs/getting-started#generate-micro-frontend`
          )}`
        )
      );
      return;
    }
  }

  console.log(chalk.green(`Creating app ${chalk.magenta(appName)}`));
  createFolder(`./apps/${appName}`);
  copyFolder(`../static/vue3`, `./apps/${appName}`);

  if (!Object.keys(config.apps).length) {
    updateAppConfig({
      port,
      appType: "host",
      appName,
      currentConfig: config,
      remotes: [],
      exposedComponents: {},
    });
  } else {
    updateAppConfig({
      port,
      appType: "remote",
      appName,
      currentConfig: config,
      remotes: [],
      exposedComponents: {},
    });
  }

  console.log(
    chalk.green(`App ${chalk.magenta(appName)} created successfully`)
  );
  console.log(`\n`);
}
