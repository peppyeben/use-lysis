import { createApp } from "vue";
import "./styles/styles.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);

import { viewOnBaseScan, shortenAddress } from "@/modules";

app.config.globalProperties.$viewOnBaseScan = viewOnBaseScan;
app.config.globalProperties.$shortenAddress = shortenAddress;

app.use(store).use(router).mount("#app");
