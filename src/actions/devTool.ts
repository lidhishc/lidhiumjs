import { getConfigFile, printLibraryHeader } from "../utils/common";

import { createDevServer } from "../utils/devTool";

export default () => async () => {
  printLibraryHeader();
  const configFile = getConfigFile();

  console.log(configFile);
  createDevServer(configFile, 3000);
};
