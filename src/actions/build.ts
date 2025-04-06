import { getConfigFile, printLibraryHeader } from "../utils/common";

import chalk from "chalk";
import { config } from "../config";
import { execSync } from "child_process";

export default () => async (appName: string) => {
  printLibraryHeader();
  const configFile = getConfigFile();

  if (!configFile) {
    console.error("lidhium.config.json not found");
    console.log(
      chalk.green(
        `For more details visit ${chalk.magenta(
          `${config.docs.webUrl}/docs/getting-started#build-app`
        )}`
      )
    );
    return;
  }

  if (!configFile.apps[appName]) {
    console.error(chalk.red(`App ${chalk.magenta(appName)} not exists`));
    console.log(
      chalk.green(
        `For more details visit ${chalk.magenta(
          `${config.docs.webUrl}/docs/getting-started#build-app`
        )}`
      )
    );
    return;
  }

  console.log(chalk.green(`building app ${chalk.magenta(appName)}`));

  execSync(`webpack --config ./apps/${appName}/webpack.config.js`, {
    stdio: "inherit",
  });

  console.log(
    chalk.green(
      `App ${chalk.magenta(appName)} build successfully in ${chalk.magenta(
        `/dist`
      )} folder`
    )
  );
};
