import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import store from "./store/index.js";
import FontAwesomeIcon from "@/utils/fontawesome";
import VueSplide from "@splidejs/vue-splide";

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(store);
app.use(VueSplide);
app.mount("#app");
