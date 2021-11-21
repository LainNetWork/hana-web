import $http from "../config/axiosConfig";

export function uploadImage(form: any){
    return $http.post("/hana/image/upload",form);
}

export function fetchImageList(request: any){
    return $http.post("/hana/image/list",request);
}

export function updateImageInfo(id: any,request: any){
    return $http.post(`/hana/image/update/${id}`,request);
}
export function fetchImageDetail(id: any){
    return $http.get(`/hana/image/${id}`);
}

export function deleteImage(id: any){
    return $http.delete(`/hana/image/${id}`);
}
