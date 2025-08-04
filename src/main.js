import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes/index.js";

import "./assets/main.css"; // If you're using Tailwind or global styles

const app = createApp(App);
app.use(router);
app.mount("#app");
