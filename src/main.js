import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/style/taiwind.css";
import "./assets/style/global.css";

import { registerGlobalComponent } from "./utils";
import { projectAuth } from "./configs/firebase";

let app = null;
let appCreated = false;

projectAuth.onAuthStateChanged(() => {
  if (!appCreated) {
    appCreated = true;
    app = createApp(App);
    registerGlobalComponent(app);
    app.use(router).mount("#app");
  }
});
