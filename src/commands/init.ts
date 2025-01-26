import { createFile, createFolder, createFolderAndFile } from "../file-manager";

import { Command } from "commander";
import chalk from "chalk";
import { createApp } from "./create-app";
import { parentAppPackage } from "../static/turbo/parentapp.package";

export default function init(command: Command) {
  command
    .command("init <appName>")
    .description("Initialize micro-frontend host and remote apps")
    .action(async (appName: string) => {
      console.log(
        chalk.green(`Starting the creation of React app: ${appName}`)
      );
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

      await createApp(`${appName}-host`, appName);
      await createApp(`${appName}-remote`, appName);

      console.log(chalk.green(`App ${appName} created successfully`));
    });
}
