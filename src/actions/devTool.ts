import { getConfigFile, printLibraryHeader } from "../utils/common";

import { createDevServer } from "../utils/devTool";

export default () => async (options: { port: number }) => {
  printLibraryHeader();
  const configFile = getConfigFile();

  console.log(configFile);
  createDevServer(configFile, options.port || 3800);
};
