import axios from 'axios';
import { ElMessage } from 'element-plus'

const $http = axios;
$http.interceptors.request.use((config) =>{
    //添加token
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
    ElMessage.error("请求服务器异常！")
    return Promise.reject(error)
})

export default $http