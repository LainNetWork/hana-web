import $http from "../config/axiosConfig";

export function fetchTaskList(form: any) {
    return $http.post("/hana/task/list",form);
}