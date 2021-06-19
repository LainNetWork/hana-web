import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import $http from "./config/axiosConfig";
import * as VueRouter from 'vue-router';
import routes from "./config/route";
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})


let app = createApp(App);
app.config.globalProperties.$http = $http
app.use(ElementPlus)
app.use(router)
app.mount('#app')