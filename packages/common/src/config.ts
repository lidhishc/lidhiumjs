import * as fs from "fs";
import * as path from "path";

export interface LidhiumConfig {
  apps: {
    [key: string]: {
      url?: string;
      remotes?: string[];
      appType?: "remote" | "host";
      exposedComponents?: {
        [key: string]: {
          source: string;
          remoteComponentValue?: string;
        };
      };
    };
  };
}

/**
 * Extract app name and component name from import string
 * @param importString The import string in format "appName/ComponentName"
 * @returns Object containing appName and componentName
 */
export function extractImportInfo(importString: string): {
  appName: string;
  componentName: string;
} {
  const [appName, componentName] = importString.split("/");
  return { appName, componentName };
}

/**
 * Get app and component name from import function
 * @param importFn The import function
 * @returns Object containing appName and componentName
 */
export function getImportInfo(importFn: () => Promise<any>): {
  appName: string;
  componentName: string;
} {
  const importString = importFn.toString();

  // Handle webpack container format
  const webpackMatch = importString.match(
    /webpack\/container\/remote\/([^/]+)\/([^"]+)/
  );
  if (webpackMatch) {
    const [_, appName, componentName] = webpackMatch;
    return { appName, componentName };
  }

  // Handle standard import format
  const standardMatch = importString.match(/import\("([^"]+)"\)/);
  if (standardMatch) {
    const [appName, componentName] = standardMatch[1].split("/");
    return { appName, componentName };
  }

  throw new Error(
    "Invalid import function format. Expected either webpack container format or standard import format"
  );
}

export interface WebpackConfig {
  publicPath: string;
  devtool: string;
}

// Singleton class to manage Lidhium configuration
class LidhiumConfigManager {
  private static instance: LidhiumConfigManager;
  private config: LidhiumConfig = { apps: {} };
  private currentAppName: string = "";
  private initialized: boolean = false;

  private constructor() {}

  public static getInstance(): LidhiumConfigManager {
    if (!LidhiumConfigManager.instance) {
      LidhiumConfigManager.instance = new LidhiumConfigManager();
    }
    return LidhiumConfigManager.instance;
  }

  /**
   * Initialize the configuration
   * @param context The webpack context path (usually __dirname from webpack.config.js)
   * @param configPath Optional path to config file
   */
  public init(context: string, configPath?: string): void {
    if (this.initialized) {
      return; // Already initialized
    }
    this.currentAppName = this.determineAppName(context);
    this.loadConfig(configPath);
    this.initialized = true;
    console.log(`Initialized Lidhium config for app: ${this.currentAppName}`);
  }

  /**
   * Check if configuration is initialized
   */
  private checkInitialized(): void {
    if (!this.initialized) {
      throw new Error("Lidhium config not initialized. Call init() first.");
    }
  }

  /**
   * Determine app name from context path
   */
  private determineAppName(context: string): string {
    // Split the path and look for the apps directory
    const parts = context.split(path.sep);
    const appsIndex = parts.indexOf("apps");

    if (appsIndex === -1 || appsIndex + 1 >= parts.length) {
      throw new Error(
        'Could not determine app name. Make sure webpack.config.js is in an app directory under "apps/"'
      );
    }

    // Return the directory name after 'apps'
    return parts[appsIndex + 1];
  }

  /**
   * Load configuration from file
   */
  private loadConfig(configPath?: string): void {
    try {
      const filePath = this.findConfigFile(configPath);
      console.log("Reading config from:", filePath);
      const data = fs.readFileSync(filePath, "utf8");
      this.config = JSON.parse(data);
    } catch (err) {
      console.error("Error reading config file:", err);
      this.config = { apps: {} };
    }
  }

  /**
   * Find the configuration file
   */
  private findConfigFile(configPath?: string): string {
    if (configPath) {
      return path.resolve(configPath);
    }

    let currentDir = process.cwd();
    let filePath = path.join(currentDir, "lidhium.config.json");

    while (!fs.existsSync(filePath)) {
      const parentDir = path.dirname(currentDir);
      if (parentDir === currentDir) {
        throw new Error(
          "Could not find lidhium.config.json in any parent directory"
        );
      }
      currentDir = parentDir;
      filePath = path.join(currentDir, "lidhium.config.json");
    }

    return filePath;
  }

  /**
   * Get the current app name
   */
  public getAppName(): string {
    this.checkInitialized();
    return this.currentAppName;
  }

  /**
   * Get the current app configuration
   */
  private getCurrentApp() {
    this.checkInitialized();
    return this.config.apps[this.currentAppName];
  }

  /**
   * Get the full configuration
   */
  private getConfig(): LidhiumConfig {
    this.checkInitialized();
    return this.config;
  }

  /**
   * Generates remote routes configuration for webpack
   */
  public generateRemoteRoutes(): Record<string, string> {
    this.checkInitialized();
    try {
      const currentApp = this.getCurrentApp();

      if (!currentApp?.remotes) {
        console.warn(`No remotes configured for current app`);
        return {};
      }

      const remotes: Record<string, string> = {};
      for (const remoteName of currentApp.remotes) {
        try {
          const remoteApp = this.getConfig().apps[remoteName];
          if (!remoteApp) {
            console.warn(`Remote app ${remoteName} not found in config`);
            continue;
          }

          if (!remoteApp.url) {
            console.warn(`Remote app ${remoteName} missing URL in config`);
            continue;
          }

          // Ensure the URL ends with a trailing slash
          const baseUrl = remoteApp.url.endsWith("/")
            ? remoteApp.url
            : `${remoteApp.url}/`;

          // Format the remote entry URL
          remotes[remoteName] = `${remoteName}@${baseUrl}remoteEntry.js`;

          console.log(
            `Configured remote ${remoteName} at ${remotes[remoteName]}`
          );
        } catch (error) {
          const err = error as Error;
          console.warn(`Error processing remote ${remoteName}:`, err.message);
        }
      }

      if (Object.keys(remotes).length === 0) {
        console.warn("No valid remotes configured");
      } else {
        console.log("Configured remotes:", remotes);
      }

      return remotes;
    } catch (error) {
      const err = error as Error;
      console.warn("Could not generate remote routes:", err.message);
      return {};
    }
  }

  /**
   * Gets exposed components configuration for webpack
   */
  public getExposedComponents(): Record<string, string> {
    this.checkInitialized();
    const currentApp = this.getCurrentApp();

    if (!currentApp?.exposedComponents) {
      console.warn(`No exposed components configured for current app`);
      return {};
    }

    const exposedComponents = currentApp.exposedComponents;
    const components = Object.entries(exposedComponents).reduce(
      (acc, [key, value]) => {
        // Ensure the path starts with ./
        const componentPath = value.source.startsWith("./")
          ? value.source
          : `./${value.source}`;
        acc[`./${key}`] = componentPath;
        return acc;
      },
      {} as Record<string, string>
    );
    console.log("Exposed components:", components);
    return components;
  }

  /**
   * Gets the application type for the current app
   * @returns The application type string or undefined if not set
   */
  public getAppType(): string | undefined {
    this.checkInitialized();
    const currentApp = this.getCurrentApp();
    return currentApp?.appType;
  }
}

// Export only the singleton instance
export const configManager = LidhiumConfigManager.getInstance();
