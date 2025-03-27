const fs = require("fs");
const path = require("path");
const { defineAsyncComponent } = require("vue");

function readConfigFile() {
  const filePath = path.join(__dirname, "../../../../lidhium.config.json");
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading file:", err);
    return {};
  }
}

function getAppName() {
  const currentPath = __dirname.split(path.sep);
  const currentFolder = currentPath[currentPath.length - 3];
  return currentFolder;
}

function generateRemoteRoutes() {
  try {
    const configFile = readConfigFile();
    const currentFolder = getAppName();
    const currentApp = configFile.apps[currentFolder];

    if (!currentApp || !currentApp.remotes) {
      return {};
    }

    const remotes = {};
    for (const remoteName of currentApp?.remotes || []) {
      try {
        const remoteApp = configFile.apps[remoteName];
        if (remoteApp && remoteApp.url) {
          remotes[remoteName] = `${remoteName}@${remoteApp.url}/remoteEntry.js`;
        } else {
          console.warn(`Remote app ${remoteName} not found or missing URL`);
        }
      } catch (remoteError) {
        console.warn(
          `Error processing remote ${remoteName}:`,
          remoteError.message
        );
      }
    }
    console.log("Remotes:", remotes);

    return remotes;
  } catch (error) {
    console.warn("Could not generate remote routes:", error.message);
    return {};
  }
}

function importRemoteComponent(remoteAppName, componentName) {
  const configFile = readConfigFile();
  const currentAppName = getAppName();

  const currentApp = configFile.apps[currentAppName];
  const remoteApp = configFile.apps[remoteAppName];

  if (!currentApp) {
    throw new Error(`App ${currentAppName} not found`);
  }

  if (!remoteApp) {
    throw new Error(`App ${remoteAppName} not found`);
  }

  if (!remoteApp.exposedComponents[componentName]) {
    throw new Error(`Component ${componentName} not found in ${remoteAppName}`);
  }

  return defineAsyncComponent(() =>
    import(`${remoteAppName}/${componentPath}`).catch((err) => {
      console.error(`Error loading ${remoteAppName}/${componentPath}:`, err);
    })
  );
}

function getExposedComponents() {
  const configFile = readConfigFile();
  const currentAppName = getAppName();
  const currentApp = configFile.apps[currentAppName];
  const exposedComponents = currentApp.exposedComponents;
  const components = Object.entries(exposedComponents).reduce(
    (acc, [key, value]) => {
      acc[`./${key}`] = value.source;
      return acc;
    },
    {}
  );
  console.log("Exposed components:", components);
  return components;
}

const config = {
  development: {
    publicPath: "auto",
    devtool: "eval-source-map",
  },
  production: {
    publicPath: "/",
    devtool: "source-map",
  },
}[process.env.NODE_ENV];

module.exports = {
  readConfigFile,
  getAppName,
  generateRemoteRoutes,
  importRemoteComponent,
  getExposedComponents,
};
