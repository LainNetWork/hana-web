import axios from 'axios';
import { ElMessage } from 'element-plus'
import router from "./route";
const $http = axios;
$http.interceptors.request.use((config) =>{
    //添加token
    const token = window.localStorage.getItem("token");
    config.headers.common['X-USER-TOKEN'] = token
    return config
})

$http.interceptors.response.use((response) =>{
    let ok = response.data.isOk;
    console.log(ok)
    if(!ok) {
        ElMessage.error(response.data.msg)
    }
    return response.data
},(error) => {
    const { response } = error
    console.log(response)
    if (response === undefined) {
        return Promise.reject(error)
    }
    if (response.status === 401) {
        ElMessage.error(response.data.msg)
        router.push("/login")
    }else {
        ElMessage.error("请求服务器异常！")
    }
    return Promise.reject(error)
})

export default $http