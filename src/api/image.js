import $http from "../config/axiosConfig";

export function uploadImage(form){
    return $http.post("/hana/image/upload",form);
}

export function fetchImageList(request){
    return $http.post("/hana/image/list",request);
}

export function updateImageInfo(id,request){
    return $http.post(`/hana/image/update/${id}`,request);
}
export function fetchImageDetail(id){
    return $http.get(`/hana/image/${id}`);
}

export function deleteImage(id){
    return $http.delete(`/hana/image/${id}`);
}
