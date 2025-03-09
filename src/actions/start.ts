import { execSync } from "child_process";
import { getConfigFile, printLibraryHeader } from "../utils/common";

export default () => async (appName: string) => {
  printLibraryHeader();
  const configFile = getConfigFile();

  if (!configFile) {
    console.error("lidhium.config.json not found");
    return;
  }

  if (!configFile.apps[appName]) {
    console.error(`App ${appName} not exists`);
    return;
  }

  const { port } = configFile.apps[appName];

  console.log(`Starting app ${appName}`);

  execSync(
    `webpack serve --config ./apps/${appName}/webpack.config.js --port ${port}`,
    { stdio: "inherit" }
  );
};
