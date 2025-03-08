import { execSync } from "child_process";
import { getConfigFile, printLibraryHeader } from "../utils/common";

export default () => async (appName: string) => {
  printLibraryHeader();
  const configFile = getConfigFile();

  if (!configFile) {
    console.error("lidhro.config.json not found");
    return;
  }

  if (!configFile.apps[appName]) {
    console.error(`App ${appName} not exists`);
    return;
  }

  console.log(`building app ${appName}`);

  execSync(`webpack --config ./apps/${appName}/webpack.config.js`, {
    stdio: "inherit",
  });
};
