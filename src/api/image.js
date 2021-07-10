import $http from "../config/axiosConfig";

export function uploadImage(form){
    return $http.post("/api/image/upload",form);
}

export function fetchImageList(request){
    return $http.post("/api/image/list",request);
}

export function updateImageInfo(id,request){
    return $http.post(`/api/image/update/${id}`,request);
}
export function fetchImageDetail(id){
    return $http.get(`/api/image/${id}`);
}

export function deleteImage(id){
    return $http.delete(`/api/image/${id}`);
}
