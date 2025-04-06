import chalk from "chalk";
import { config } from "../config";
import fs from "fs";
import { getAppName } from "../utils/common";
import { getConfigFile } from "../utils/common";
import inquirer from "inquirer";
export default function bindActions() {
  return async () => {
    const configJsonPath = "./../../lidhium.config.json";
    const configFile = getConfigFile(configJsonPath, true);
    const appName = getAppName();
    if (!configFile) {
      console.log(chalk.red("Please run this command from the app directory"));
      console.log(
        chalk.green(
          `For more details visit ${chalk.magenta(
            `${config.docs.webUrl}/docs/getting-started#bind-micro-app`
          )}`
        )
      );
      return;
    }
    const apps = configFile.apps;
    const { selectedDestinationApp } = await inquirer.prompt([
      {
        type: "list", // Works like a radio button
        name: "selectedDestinationApp",
        message: "Select Destination App:",
        choices: Object.keys(apps).filter((app: string) => app !== appName),
      },
    ]);
    console.log(selectedDestinationApp);

    const currentRemotes = (configFile.apps[appName].remotes as string[]) || [];

    configFile.apps[appName].remotes = [
      ...new Set(currentRemotes).add(selectedDestinationApp),
    ];

    fs.writeFileSync(configJsonPath, JSON.stringify(configFile, null, 2));
  };
}
