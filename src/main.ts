import { createApp } from 'vue'
import App from './App.vue'
import $http from "./config/axiosConfig";
import router from "./config/route";
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-message.css'

let app = createApp(App);
app.config.globalProperties.$http = $http
app.use(router)
app.mount('#app')