import $http from "../config/axiosConfig";


export function searchPixivByPid(pid){
    return $http.get(`/api/pixiv/detail/${pid}`);
}

export function fetchImagesByUid(uid){
    return $http.get(`/api/pixiv/allImages/${uid}`);
}