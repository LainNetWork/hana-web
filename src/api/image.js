import $http from "../config/axiosConfig";

export function fetchImageList(request){
    return $http.post("/api/list",request);
}

export function updateImageInfo(id,request){
    return $http.post(`/api/update/${id}`,request);
}
export function fetchImageDetail(id){
    return $http.post(`/api/detail/${id}`);
}
