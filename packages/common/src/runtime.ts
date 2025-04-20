import {
  App,
  Component,
  createApp,
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
} from "vue";
import { ErrorMessage, Loader } from "./components";

import { FederationHost } from "@module-federation/runtime";
import { getImportInfo } from "./config";

// interface AppConfig {
//   port: string;
//   appType: string;
//   remotes: string[];
//   exposedComponents: Record<string, any>;
//   url: string;
// }

// interface Config {
//   apps: Record<string, AppConfig>;
// }

// interface Remote {
//   name: string;
//   entry: string;
// }

// interface RemoteModule {
//   default: {
//     [key: string]: Component;
//   };
// }

// Track initialized containers
// const remoteContainerInitialized: Record<string, boolean> = {};

// let federationHost: FederationHost | null = null;

// const getRuntimeConfig = (appName: string, config: Config) => {
//   const appConfig = config.apps[appName];
//   if (!appConfig) {
//     throw new Error(
//       `App ${appName} not found in config. Available apps: ${Object.keys(
//         config.apps
//       ).join(", ")}`
//     );
//   }

//   const remotes = appConfig.remotes
//     .map((remoteName: string) => {
//       const remoteConfig = config.apps[remoteName];
//       if (!remoteConfig) {
//         console.error(`Remote ${remoteName} not found in config`);
//         return null;
//       }
//       return {
//         name: remoteName,
//         entry: `${remoteConfig.url}/remoteEntry.js`,
//       } as Remote;
//     })
//     .filter((remote): remote is Remote => remote !== null);

//   return {
//     name: appName,
//     remotes,
//   };
// };

// const setFederationHost = (host: FederationHost) => {
//   federationHost = host;
// };

type RemoteOptions = {
  /** Dynamic import that returns the remote module. */
  importFn: () => Promise<any>;
  /** Props forwarded to the remote root component. */
  componentProps?: {
    injectProps?: Record<string, any>;
    errorComponent?: Component;
    loadingComponent?: Component;
    delay?: number;
    timeout?: number;
    suspensible?: boolean;
    forcedLoadingTime?: number;
    onError?: () => void;
  };
  /** Fail & show error after this many ms (default 20 s). */
  timeout?: number;
};

function loadRemoteComponentVue(opts: RemoteOptions) {
  const { importFn, componentProps = {}, timeout: globalTimeout = 0 } = opts;

  const {
    injectProps = {},
    errorComponent = ErrorMessage,
    loadingComponent = Loader,
    timeout: componentTimeout = 0,
    forcedLoadingTime = 0,
    onError = () => {},
  } = componentProps;

  // Use the smaller timeout value between global and component level
  const timeout = Math.min(globalTimeout, componentTimeout);

  const { appName, componentName } = getImportInfo(importFn);
  const containerId = `remote-${appName}-${componentName}`;

  return defineComponent({
    name: `Remote_${appName}_${componentName}`,
    inheritAttrs: false,

    setup() {
      const isLoading = ref(true);
      const error = ref<string | null>(null);
      let remoteApp: App | null = null;
      let timer: number | null = null;

      function fail(message: string) {
        error.value = message;
        isLoading.value = false;
        if (remoteApp) {
          remoteApp.unmount();
          remoteApp = null;
        }
        onError();
      }

      async function load() {
        try {
          error.value = null;
          isLoading.value = true;
          let isTimedOut = false;

          // Set timeout before loading
          if (timeout > 0) {
            timer = window.setTimeout(() => {
              console.log("Loading timed out after", timeout / 1000, "seconds");
              isTimedOut = true;
              fail(`Loading timed out after ${timeout / 1000}s`);
              clearTimeout(timer!);
            }, timeout);
          }

          if (forcedLoadingTime > 0) {
            await new Promise((r) => setTimeout(r, forcedLoadingTime));
          }

          // Check if we've timed out before proceeding
          if (isTimedOut) {
            return;
          }

          const mod = await importFn();

          // Check again if we've timed out during the import
          if (isTimedOut) {
            return;
          }

          clearTimeout(timer!);

          const remoteRoot = mod.default ?? mod;
          if (!remoteRoot) throw new Error("Remote has no default export");

          await nextTick();
          const container = document.getElementById(containerId);
          if (!container) throw new Error(`Missing #${containerId} in DOM`);

          container.innerHTML = "";
          const target = document.createElement("div");
          target.className = "remote-component-mount";
          container.appendChild(target);

          remoteApp = createApp({
            setup() {
              provide("remoteProps", {
                ...injectProps,
                appName,
                componentName,
              });
              return () => h(remoteRoot);
            },
          });

          remoteApp.mount(target);
          isLoading.value = false;
        } catch (e) {
          fail(e instanceof Error ? e.message : String(e));
        }
      }

      function retry() {
        if (remoteApp) {
          remoteApp.unmount();
          remoteApp = null;
        }
        load();
      }

      onMounted(load);
      onBeforeUnmount(() => {
        if (timer) clearTimeout(timer);
        if (remoteApp) remoteApp.unmount();
      });

      return () =>
        h("div", { class: "relative w-full h-full" }, [
          h("div", {
            id: containerId,
            class: "remote-component-container w-full h-full",
          }),

          isLoading.value && h(loadingComponent),

          error.value &&
            h(errorComponent, {
              onRetry: retry,
              error: error.value,
            }),
        ]);
    },
  });
}

export { loadRemoteComponentVue, type RemoteOptions };
