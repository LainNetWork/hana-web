import $http from "../config/axiosConfig";


export function searchPixivByPid(pid){
    return $http.get(`/hana/pixiv/detail/${pid}`);
}

export function fetchImagesByUid(uid){
    return $http.get(`/hana/pixiv/allImages/${uid}`);
}

export function fetchImages(data){
    return $http.post("/hana/pixiv/allImages/",data);
}
