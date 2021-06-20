import HomePage from "../components/admin/HomePage";
import Config from  "../components/admin/Config"
import Collection from  "../components/admin/Collection"
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
    }
]
export default routes