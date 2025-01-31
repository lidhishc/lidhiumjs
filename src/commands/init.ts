import { createFile, createFolder, createFolderAndFile } from "../file-manager";

import { Command } from "commander";
import chalk from "chalk";
import { createApp } from "./create-app";
import { parentAppPackage } from "../static/turbo/parentapp.package";
import flinget from "figlet";
// import inquirer from "inquirer";

export default function init() {
  return async (appName: string) => {
    // const { choice } = await inquirer.prompt([
    //   {
    //     type: "select", // Creates a radio button–like interface
    //     name: "choice",
    //     message: "Select an base app:",
    //     choices: ["Vue 3"],
    //   },
    // ]);
    // console.log(choice);

    console.log(
      chalk.yellow(
        flinget.textSync("LidhRo", {
          horizontalLayout: "full",
          font: "Big Money-ne",
          whitespaceBreak: true,
        })
      )
    );

    console.log(chalk.green(`Creating Vue app: ${appName}`));
    console.log(`\n`);
    createFolderAndFile(
      appName,
      "package.json",
      JSON.stringify(parentAppPackage, null, 2)
    );

    createFile(
      `${appName}/lidhvue.config.json`,
      `{
          "name": "${appName}",
          "host": "${appName}-host"
        }`
    );

    createFile(
      `${appName}/turbo.json`,
      `{
            "$schema": "https://turbo.build/schema.json",
            "ui": "tui",
            "tasks": {
                "build": {
                "dependsOn": ["^build"],
                "inputs": ["$TURBO_DEFAULT$", ".env*"],
                "outputs": ["dist/**"]
                },
                "lint": {
                "dependsOn": ["^lint"]
                },
                "check-types": {
                "dependsOn": ["^check-types"]
                },
                "dev": {
                "cache": false,
                "persistent": true
                },
                "serve": {
                "cache": false,
                "persistent": true
                }
            }
        }`
    );

    createFolder(`${appName}/apps`);
    createFolder(`${appName}/apps/${appName}-host`);
    createFolder(`${appName}/apps/${appName}-remote`);

    await createApp(`${appName}-host`, appName, true);
    await createApp(`${appName}-remote`, appName, true);

    console.log(`\n`);
    console.log(chalk.green(`App ${appName} created successfully`));
    console.log(`\n`);
    console.log(
      chalk.green(
        `Run ${chalk.magenta(`'cd ${appName}'`)} to navigate to the app`
      )
    );
    console.log(`\n`);
    console.log(chalk.yellow(`Install dependencies`));
    console.log(`\n`);
    console.log(
      chalk.green(`Run ${chalk.magenta(`'turbo dev'`)} to start the app 🚀🚀🚀`)
    );
    console.log(`\n\n`);
  };
}
