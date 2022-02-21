import $http from "../config/axiosConfig";


export function searchPixivByPid(pid: any){
    return $http.get(`/hana/pixiv/detail/${pid}`);
}


export function fetchPidsByUid(uid: string):Promise<string[]>{
    return $http.get(`/hana/pixiv/pids/${uid}`);
}

export function fetchImages(data: any){
    return $http.post("/hana/pixiv/allImages/",data);
}
