import {
  Component,
  defineAsyncComponent,
  defineComponent,
  h,
  provide,
} from "vue";
import { FederationHost } from "@module-federation/runtime";

const Loader = defineComponent({
  name: "Loader",
  setup() {
    return () =>
      h(
        "div",
        {
          class: "loader-container",
          style: `
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100px;
        `,
        },
        [
          h("div", {
            class: "loader",
            style: `
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          `,
          }),
          h(
            "span",
            {
              class: "loader-text",
              style: `
            margin-top: 10px;
            color: #666;
            font-size: 14px;
          `,
            },
            "Loading..."
          ),
          h(
            "style",
            null,
            `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `
          ),
        ]
      );
  },
});

const ErrorMessage = defineComponent({
  name: "ErrorMessage",
  emits: ["retry"],
  setup() {
    return () =>
      h(
        "div",
        {
          class: "error-container",
          style: `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 200px;
            padding: 20px;
            text-align: center;
          `,
        },
        [
          h(
            "div",
            {
              class: "error-icon",
              style: `
              font-size: 32px;
              margin-bottom: 16px;
            `,
            },
            "⚠️"
          ),
          h(
            "div",
            {
              class: "error-message",
              style: `
              color: #e74c3c;
              font-size: 16px;
              margin-bottom: 16px;
            `,
            },
            "Failed to load component"
          ),
          h(
            "button",
            {
              class: "retry-button",
              style: `
                background-color: #3498db;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                transition: background-color 0.3s ease;
              `,
              onMouseover: (e: MouseEvent) => {
                (e.target as HTMLElement).style.backgroundColor = "#2980b9";
              },
              onMouseout: (e: MouseEvent) => {
                (e.target as HTMLElement).style.backgroundColor = "#3498db";
              },
              onClick: () => {
                window.location.reload();
              },
            },
            "Retry"
          ),
        ]
      );
  },
});

interface AppConfig {
  port: string;
  appType: string;
  remotes: string[];
  exposedComponents: Record<string, any>;
  url: string;
}

interface Config {
  apps: Record<string, AppConfig>;
}

interface Remote {
  name: string;
  entry: string;
}

interface RemoteModule {
  default: Component;
}

// Track initialized containers
const remoteContainerInitialized: Record<string, boolean> = {};

let federationHost: FederationHost | null = null;

const getRuntimeConfig = (appName: string, config: Config) => {
  const appConfig = config.apps[appName];
  if (!appConfig) {
    throw new Error(
      `App ${appName} not found in config. Available apps: ${Object.keys(
        config.apps
      ).join(", ")}`
    );
  }

  const remotes = appConfig.remotes
    .map((remoteName: string) => {
      const remoteConfig = config.apps[remoteName];
      if (!remoteConfig) {
        console.error(`Remote ${remoteName} not found in config`);
        return null;
      }
      return {
        name: remoteName,
        entry: `${remoteConfig.url}/remoteEntry.js`,
      } as Remote;
    })
    .filter((remote): remote is Remote => remote !== null);

  return {
    name: appName,
    remotes,
  };
};

const setFederationHost = (host: FederationHost) => {
  federationHost = host;
};

const loadRemoteComponentVue = (
  componentName: string,
  inputData: {
    injectProps?: Record<string, any>;
    customLoaderComponent?: Component;
    errorComponent?: Component;
    delay?: number;
    timeout?: number;
    suspensible?: boolean;
    forcedLoadingTime?: number;
    onError?: Function;
  } = {}
) => {
  const {
    injectProps = {},
    customLoaderComponent,
    errorComponent = ErrorMessage,
    delay = 0,
    timeout = 5000,
    suspensible = false,
    forcedLoadingTime = 0,
    onError = () => {},
  } = inputData;

  // Use the custom loader if provided, otherwise use the default Loader
  const loadingComponent = customLoaderComponent || Loader;

  return defineAsyncComponent({
    loader: async () => {
      try {
        // Add forced loading time at the start
        if (forcedLoadingTime > 0) {
          await new Promise((resolve) =>
            setTimeout(resolve, forcedLoadingTime)
          );
        }

        if (!federationHost) {
          throw new Error(
            "Module Federation runtime not initialized. Call setFederationHost first."
          );
        }

        // Initialize container if not already done
        if (!remoteContainerInitialized[componentName]) {
          console.log(`Loading remote component container: ${componentName}`);
          try {
            await federationHost.loadRemote(componentName);
          } catch (error) {
            console.error(
              `Error loading remote component ${componentName}:`,
              error
            );
            throw error;
          }
          remoteContainerInitialized[componentName] = true;
          console.log(`Remote container initialized: ${componentName}`);
        }

        const container = (await federationHost.loadRemote(
          componentName
        )) as RemoteModule;
        if (!container?.default) {
          throw new Error(`Failed to load ${componentName} container`);
        }

        console.log(`Container loaded for ${componentName}:`);

        return defineComponent({
          name: "RemoteComponentWrapper",
          setup() {
            // Provide all props for injection
            if (injectProps) {
              Object.entries(injectProps).forEach(([key, value]) => {
                const actualValue =
                  typeof value === "function" ? value() : value;
                provide(key, actualValue);
              });
            }
            return () => h(container.default, injectProps);
          },
        });
      } catch (error) {
        console.error(
          `Error loading remote component ${componentName}:`,
          error
        );
        // Return a component that will show the error message
        return defineComponent({
          name: "ErrorComponent",
          setup() {
            return () =>
              h(errorComponent, {
                onRetry: () => {
                  window.location.reload();
                },
              });
          },
        });
      }
    },
    loadingComponent,
    errorComponent,
    onError(error) {
      console.error("Error in remote component:", error);
      if (onError) {
        onError(error);
      }
    },
    delay,
    timeout,
    suspensible,
  });
};

export {
  getRuntimeConfig,
  loadRemoteComponentVue,
  setFederationHost,
  type AppConfig,
  type Config,
  type Remote,
};
