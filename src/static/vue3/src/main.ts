import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "core-js/stable";
import "regenerator-runtime/runtime";

createApp(App).use(store).use(router).mount("#app");
