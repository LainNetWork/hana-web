import $http from "../config/axiosConfig";


export function searchPixivByPid(pid: any){
    return $http.get(`/hana/pixiv/detail/${pid}`);
}

export function fetchImagesByUid(uid: any){
    return $http.get(`/hana/pixiv/allImages/${uid}`);
}

export function fetchImages(data: any){
    return $http.post("/hana/pixiv/allImages/",data);
}
