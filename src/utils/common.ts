import chalk from "chalk";
import { config } from "../config";
import flinget from "figlet";
import fs from "fs";
import path from "path";
export const printLibraryHeader = () => {
  console.log(
    chalk.yellow(
      flinget.textSync("Lidhium", {
        horizontalLayout: "full",
        font: "Big Money-ne",
        whitespaceBreak: true,
      })
    )
  );
};

export const updateAppConfig = ({
  port,
  appType,
  appName,
  currentConfig,
  remotes = {},
  exposedComponents = {},
}: {
  port: number;
  appType: "host" | "remote";
  appName: string;
  currentConfig: any;
  remotes: object;
  exposedComponents: object;
}) => {
  const configJsonPath = `./lidhium.config.json`;
  const baseURL = process.env.baseURL
    ? process.env.baseURL
    : `http://localhost:${port}`;
  const appConfig = {
    port,
    appType,
    remotes,
    exposedComponents,
    url: baseURL,
  };
  currentConfig.apps[appName] = appConfig;
  fs.writeFileSync(configJsonPath, JSON.stringify(currentConfig, null, 2));
};

export const getConfigFile = (
  configPath?: string,
  skipLog: boolean = false
) => {
  let fileContent = {} as any;
  let isFileExist = false;
  isFileExist = fs.existsSync(configPath || `./lidhium.config.json`);
  if (!isFileExist) {
    !skipLog &&
      console.error(
        chalk.red(`lidhium.config.json not found`),
        chalk.green(`Run ${chalk.magenta(`'lidhium init'`)}`)
      );
    return;
  }
  fileContent = fs.readFileSync(configPath || `./lidhium.config.json`, "utf-8");
  return JSON.parse(fileContent);
};

export const updateExposedComponents = ({
  appName,
  componentName,
  componentPath,
}: {
  appName: string;
  componentName: string;
  componentPath: string;
}) => {
  const configJsonPath = `./../../lidhium.config.json`;
  const currentConfig = getConfigFile(configJsonPath, true);
  if (!currentConfig) {
    console.log(chalk.red("Please run this command from the app directory"));
    console.log(
      chalk.green(
        `For more details visit ${chalk.magenta(
          `${config.docs.webUrl}/docs/getting-started#expose-the-remote-app`
        )}`
      )
    );
    return;
  }
  if (!currentConfig.apps[appName]) {
    console.error(`App ${appName} not exists`);
    console.log(
      chalk.green(
        `For more details visit ${chalk.magenta(
          `${config.docs.webUrl}/docs/getting-started#expose-the-remote-app`
        )}`
      )
    );
    return;
  }
  const exposedComponents = currentConfig.apps[appName].exposedComponents;
  exposedComponents[componentName] = {
    source: componentPath,
    remoteComponentValue: `${appName}/${componentName}`,
  };
  fs.writeFileSync(configJsonPath, JSON.stringify(currentConfig, null, 2));
};

export function getAppName() {
  const currentDir = process.cwd(); // Gets full path
  const folderName = path.basename(currentDir); // Extracts folder name
  return folderName;
}
