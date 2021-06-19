
import $http from "../config/axiosConfig";
export default function searchPixivByPid(pid){
    return $http.get(`/api/pixiv/detail/${pid}`);
}
