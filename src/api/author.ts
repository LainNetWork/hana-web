import $http from "../config/axiosConfig";

export function fetchAuthors(form: any){
    return $http.post("/hana/author/list",form);
}
export function likeAuthors(form: any){
    return $http.post("/hana/author/like",form);
}
