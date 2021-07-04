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