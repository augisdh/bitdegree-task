import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";

declare global {
  interface Window {
    ApexCharts: any;
  }
}

createApp(App).mount("#app");
