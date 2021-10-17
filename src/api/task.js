import $http from "../config/axiosConfig";

export function fetchTaskList(form) {
    return $http.post("/hana/task/list",form);
}