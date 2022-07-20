import { createApp } from "vue";
import VueSplide from "@splidejs/vue-splide";
import { plugin, defaultConfig } from "@formkit/vue";

import "./assets/styles/global.css";

import App from "./App.vue";
import router from "./router/router.js";
import store from "./store/index.js";
import FontAwesomeIcon from "@/plugins/fontawesome";

import axiosSetup from "./api/axios/axiosClient.js";
// call the axios setup method here
axiosSetup(store, router);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(store);
app.use(VueSplide);
app.use(plugin, defaultConfig);
app.mount("#app");
