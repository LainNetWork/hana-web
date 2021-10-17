import Gallery from "../components/admin/Gallery"
import Config from  "../components/admin/Config"
import FetchImage from "../components/admin/FetchImage"
import Author from "../components/admin/Author"
import Login from  "../components/admin/Login"
import NotFound from  "../components/admin/NotFound"
import UpdateTask from  "../components/admin/UpdateTask"
import Index from  "../components/admin/Index"

import * as VueRouter from 'vue-router';

const routes = [
    {
        path: "/",
        component: Index,
        children:[
            {
                path: "/keyWord/:keyWord",
                component: Gallery,
                props:true
            },
            {
                path: "/task/:taskId",
                component: Gallery,
                props:true
            },
            {
                path: "/",
                component: Gallery
            },
            {
                path: "/author",
                component: Author
            },
            {
                path: "/fetchImg",
                component: FetchImage
            },
            {
                path: "/config",
                component: Config
            },
            {
                path: "/task",
                component: UpdateTask,
                props: true
            }
        ]
    },
    {
        path: "/system",
        component: Login
    },
    {
        path: "/404",
        component: NotFound
    }
]
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

export default router