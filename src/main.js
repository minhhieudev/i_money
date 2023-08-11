import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"; // Import Vuex store

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

    // Đăng ký các component toàn cục
    registerGlobalComponent(app);

    // Sử dụng Vuex store và Vue Router
    app.use(store);
    app.use(router);

    // Gắn ứng dụng vào #app
    app.mount("#app");
  }
});
