import "./style.css";

import {OhVueIcon, addIcons } from "oh-vue-icons";
import * as FaIcons from "oh-vue-icons/icons/fa";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./routes";
import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount("#app");
