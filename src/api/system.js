import $http from "../config/axiosConfig";

export async function login(account, pass) {
    const { data } = await $http.post("/api/system/login", {
        account: account,
        password:pass
    });
    window.localStorage.setItem("token", data);
}

export function fetchSystemConfig() {
    return $http.get("/api/system/config");
}

export function saveConfig(data) {
    return $http.post("/api/system/config",data);
}

export function likeImages(data) {
    return $http.post("/api/system/images/like",data);
}

export function generateKey() {
    return $http.get(`/api/system/generateKey`);
}

export function likeImage(id,status) {
    return $http.post(`/api/system/image/like/${id}/${status}`);
}