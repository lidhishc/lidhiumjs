import { updateExposedComponents } from "../utils/common";
import { getAppName } from "../utils/common";

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
  };
}
