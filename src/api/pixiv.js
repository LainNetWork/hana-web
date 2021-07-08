import $http from "../config/axiosConfig";
import da from "element-plus/packages/locale/lang/da";


export function searchPixivByPid(pid){
    return $http.get(`/api/pixiv/detail/${pid}`);
}

export function fetchImagesByUid(uid){
    return $http.get(`/api/pixiv/allImages/${uid}`);
}

export function fetchImages(data){
    return $http.post("/api/pixiv/allImages/",data);
}