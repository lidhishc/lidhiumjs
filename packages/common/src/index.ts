import * as config from "./config";
import * as runtime from "./runtime";

export * from "./config";
export * from "./runtime";

// Use type assertion to avoid private property exposure
export default {
  ...(config as any),
  ...runtime,
} as const;
