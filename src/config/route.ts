import Gallery from "../components/admin/Gallery.vue"
import Config from  "../components/admin/Config.vue"
import FetchImage from "../components/admin/FetchImage.vue"
import Author from "../components/admin/Author.vue"
import Login from  "../components/admin/Login.vue"
import NotFound from  "../components/admin/NotFound.vue"
import UpdateTask from  "../components/admin/UpdateTask.vue"
import * as VueRouter from 'vue-router';

const routes = [
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