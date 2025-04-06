import { getConfigFile, printLibraryHeader } from "../utils/common";

import chalk from "chalk";
import { config } from "../config";
import { execSync } from "child_process";

export default () => async (appName: string) => {
  printLibraryHeader();
  const configFile = getConfigFile();

  if (!configFile) {
    console.error("lidhium.config.json not found");
    return;
  }

  if (!configFile.apps[appName]) {
    console.error(`App ${appName} not exists`);
    console.log(
      chalk.green(
        `For more details visit ${chalk.magenta(
          `${config.docs.webUrl}/docs/getting-started#commands`
        )}`
      )
    );
    return;
  }

  const { port } = configFile.apps[appName];

  console.log(`Starting app ${appName}`);

  execSync(
    `webpack serve --config ./apps/${appName}/webpack.config.js --port ${port}`,
    { stdio: "inherit" }
  );
};
