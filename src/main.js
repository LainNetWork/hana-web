import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import $http from "./config/axiosConfig";
import router from "./config/route";

let app = createApp(App);
app.config.globalProperties.$http = $http
app.use(ElementPlus)
app.use(router)
app.mount('#app')