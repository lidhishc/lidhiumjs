import chalk from "chalk";
import flinget from "figlet";
import fs from "fs";

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
  const packageJsonPath = `./lidhro.config.json`;
  const appConfig = {
    port,
    appType,
    remotes,
    exposedComponents,
  };
  currentConfig.apps[appName] = appConfig;
  fs.writeFileSync(packageJsonPath, JSON.stringify(currentConfig, null, 2));
};

export const getConfigFile = () => {
  let fileContent = {} as any;
  let isFileExist = false;
  isFileExist = fs.existsSync(`./lidhro.config.json`);
  if (!isFileExist) {
    console.error(
      chalk.red(`lidhro.config.json not found`),
      chalk.green(`Run ${chalk.magenta(`'lidhro init'`)}`)
    );
    return;
  }
  fileContent = fs.readFileSync(`./lidhro.config.json`, "utf-8");
  return JSON.parse(fileContent);
};
