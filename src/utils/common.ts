import chalk from "chalk";
import flinget from "figlet";
import fs from "fs";
import path from "path";

export const printLibraryHeader = () => {
  console.log(
    chalk.yellow(
      flinget.textSync("LidhRo", {
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
  const configJsonPath = `./lidhro.config.json`;
  const appConfig = {
    port,
    appType,
    remotes,
    exposedComponents,
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
  isFileExist = fs.existsSync(configPath || `./lidhro.config.json`);
  if (!isFileExist) {
    !skipLog &&
      console.error(
        chalk.red(`lidhro.config.json not found`),
        chalk.green(`Run ${chalk.magenta(`'lidhro init'`)}`)
      );
    return;
  }
  fileContent = fs.readFileSync(configPath || `./lidhro.config.json`, "utf-8");
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
  const configJsonPath = `./../../lidhro.config.json`;
  const currentConfig = getConfigFile(configJsonPath);
  if (!currentConfig) {
    return;
  }
  if (!currentConfig.apps[appName]) {
    console.error(`App ${appName} not exists`);
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
  console.log("Current directory:", currentDir);
  const folderName = path.basename(currentDir); // Extracts folder name
  return folderName;
}
