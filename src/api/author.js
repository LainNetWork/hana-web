import $http from "../config/axiosConfig";

export function fetchAuthors(form){
    return $http.post("/hana/author/list",form);
}
