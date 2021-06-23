import HomePage from "../components/admin/HomePage";
import Config from  "../components/admin/Config"
import Collection from  "../components/admin/Collection"
import Login from  "../components/admin/Login"
import * as VueRouter from 'vue-router';

const routes = [
    {
        path: "/",
        component: HomePage
    },
    {
        path: "/collection",
        component: Collection
    },
    {
        path: "/config",
        component: Config
    },
    {
        path: "/login",
        component: Login
    }
]
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

export default router