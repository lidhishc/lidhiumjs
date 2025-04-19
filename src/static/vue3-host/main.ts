import "@root/global/global.style.css";
import "./registerServiceWorker";
import "core-js/stable";
import "regenerator-runtime/runtime";

import { getRuntimeConfig, setFederationHost } from "@lidhium/common";

import App from "./App.vue";
import config from "@root/lidhium.config.json";
import { createApp } from "vue";
import { init } from "@module-federation/runtime";
import router from "./router";

async function bootstrap() {
  try {
    const appName = process.env.APP_NAME as string;
    const federationHost = getRuntimeConfig(appName, config);
    const app = createApp(App);
    const federationHostIntValue = init(federationHost);
    setFederationHost(federationHostIntValue);
    app.use(router).mount("#app");
  } catch (error) {
    console.error("Failed to initialize application:", error);
  }
}

bootstrap();
