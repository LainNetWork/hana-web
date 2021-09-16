import $http from "../config/axiosConfig";

export function fetchAuthors(form){
    return $http.post("/api/author/list",form);
}