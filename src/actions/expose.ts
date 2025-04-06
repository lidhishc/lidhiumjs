import chalk from "chalk";
import { config } from "../config";
import { getAppName } from "../utils/common";
import { updateExposedComponents } from "../utils/common";
export default function exposeActions() {
  return (componentPath: string) => {
    const appName = getAppName();
    const componentName = componentPath
      .split("/")
      .pop()
      ?.split(".vue")[0] as string;
    updateExposedComponents({
      appName,
      componentName,
      componentPath,
    });
    console.log(
      chalk.green(
        `Component ${chalk.magenta(
          componentName
        )} exposed successfully in ${chalk.magenta(appName)}`
      )
    );
  };
}
