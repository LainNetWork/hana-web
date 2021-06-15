import axios from 'axios';
import { ElMessage } from 'element-plus'

const $http = axios;
$http.interceptors.request.use((config) =>{
    //添加token
    return config
})

$http.interceptors.response.use((response) =>{
    let ok = response.data.isOk;
    if(!ok) {
        ElMessage.error("服务出错：" + response.data.msg)
    }
    return response.data
},(error) => {
    return Promise.reject(error)
})

export default $http