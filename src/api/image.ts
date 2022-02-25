import $http from "../config/axiosConfig";
import {PageableMO} from "../types/common";

export function uploadImage(form: any){
    return $http.post("/hana/image/upload",form);
}
export interface ImageUrls {
    mini:string,
    regular:string,
    original:string
}
export interface ImageInfo {
    id:string
    pid:string
    urls:ImageUrls
    title:string
    author:string
    authorId:string
    authorLiked:boolean
    tags:string[],
    storageType:string,
    fileName:string
    page:string
    pageTotal:string
    like:boolean
}
export async function fetchImageList(request: any): Promise<PageableMO<ImageInfo>> {
    return $http.post<any, PageableMO<ImageInfo>>("/hana/image/list", request)
}

export interface ImageInfoUpdateForm {
    pid:string,
    title:string,
    author:string,
    authorId:string,
    tags:string[]
}

export function updateImageInfo(id: any,request: ImageInfoUpdateForm){
    return $http.post(`/hana/image/update/${id}`,request);
}
export function fetchImageDetail(id: string) : Promise<ImageInfo>{
    return $http.get<any,ImageInfo>(`/hana/image/${id}`);
}

export function deleteImage(id: any){
    return $http.delete(`/hana/image/${id}`);
}

export function deleteImages(ids: string[]){
    return $http.delete(`/hana/image/`,{data: ids});
}