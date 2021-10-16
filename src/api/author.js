import $http from "../config/axiosConfig";

export function fetchAuthors(form){
    return $http.post("/hana/author/list",form);
}
export function likeAuthors(form){
    return $http.post("/hana/author/like",form);
}
