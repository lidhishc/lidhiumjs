import "./style.css";

import App from "./App.vue";
import { createApp } from "vue";

const app = createApp(App);

// Mount the app
app.mount("#app");

// Log any errors
window.onerror = (message, source, lineno, colno, error) => {
  console.error("Global error:", { message, source, lineno, colno, error });
  return false;
};
