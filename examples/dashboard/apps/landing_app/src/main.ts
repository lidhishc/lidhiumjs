import "@root/global/global.style.css";
import "./registerServiceWorker";
import "core-js/stable";
import "regenerator-runtime/runtime";

import App from "./App.vue";
import { createApp } from "vue";

async function bootstrap() {
  try {
    const app = createApp(App);
    app.mount("#app");
  } catch (error) {
    console.error("Failed to initialize application:", error);
  }
}

bootstrap();
