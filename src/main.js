import { createApp } from 'vue'
import App from './App.vue'
import $http from "./config/axiosConfig";
import router from "./config/route";

let app = createApp(App);
app.config.globalProperties.$http = $http
app.use(router)
app.mount('#app')