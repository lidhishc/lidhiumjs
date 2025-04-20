import "@root/global/global.style.css";
import "./registerServiceWorker";
import "core-js/stable";
import "regenerator-runtime/runtime";

import App from "./App.vue";
import { createApp } from "vue";
import router from "./router";
import store from "@/store";

async function bootstrap() {
  try {
    const app = createApp(App);
    app.use(router).use(store).mount("#app");
  } catch (error) {
    console.error("Failed to initialize application:", error);
  }
}

bootstrap();
