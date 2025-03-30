import { createApp } from "vue";
import App from "./App.vue";
import "@root/global/global.style.css";
import "./registerServiceWorker";
import "core-js/stable";
import "regenerator-runtime/runtime";

createApp(App).mount("#app");
