import inquirer from "inquirer";
import { getAppName, updateExposedComponents } from "../utils/common";
import { getConfigFile } from "../utils/common";
import fs from "fs";

export default function bindActions() {
  return async () => {
    const configJsonPath = "./../../lidhro.config.json";
    const configFile = getConfigFile(configJsonPath, true);
    const appName = getAppName();
    if (!configFile) {
      console.error("Run bind from App's root of the project");
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

    const destinationAppConfig = apps[selectedDestinationApp];
    const remoteURL = `http://localhost:${destinationAppConfig.port}`;

    console.log(`remoteURL ${remoteURL} `);

    configFile.apps[appName].remotes[selectedDestinationApp] = remoteURL;
    fs.writeFileSync(configJsonPath, JSON.stringify(configFile, null, 2));
  };
}
