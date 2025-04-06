import { getConfigFile, printLibraryHeader } from "../utils/common";

import chalk from "chalk";
import { config } from "../config";
import { createDevServer } from "../utils/devTool";

export default () => async (options: { port: number }) => {
  printLibraryHeader();
  console.log(
    chalk.green(
      `For more details visit ${chalk.magenta(
        `${config.docs.webUrl}/docs/getting-started#dev-tool`
      )}`
    )
  );
  const configFile = getConfigFile();
  createDevServer(configFile, options.port || 3800);
};
