import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "core-js/stable";
import "regenerator-runtime/runtime";

createApp(App).mount("#app");
