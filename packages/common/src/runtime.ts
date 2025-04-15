import {
  Component,
  defineAsyncComponent,
  defineComponent,
  h,
  provide,
} from "vue";
import { FederationHost } from "@module-federation/runtime";
import Loader from "./vue/Loader.vue";
import ErrorMessage from "./vue/ErrorMessage.vue";

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
  injectProps?: Record<string, any>,
  loadingComponent: Component = Loader,
  errorComponent: Component = ErrorMessage,
  delay: number = 200,
  timeout: number = 5000,
  suspensible: boolean = false,
  onError?: Function
) => {
  return defineAsyncComponent({
    loader: async () => {
      try {
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

        console.log(`Container loaded for ${componentName}:`, container);

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
        throw error;
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
