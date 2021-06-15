import $http from "../config/axiosConfig";

export default function fetchImageList(request){
    return $http.post("/api/list",request);
}