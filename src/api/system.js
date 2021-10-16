import $http from "../config/axiosConfig";

export async function login(account, pass) {
    const { data } = await $http.post("/api/system/login", {
        account: account,
        password:pass
    });
    window.localStorage.setItem("token", data);
}

export function fetchSystemConfig() {
    return $http.get("/hana/system/config");
}

export function saveConfig(data) {
    return $http.post("/hana/system/config",data);
}

export function likeImages(data) {
    return $http.post("/hana/system/images/like",data);
}
export function dislikeImages(data) {
    return $http.post("/hana/system/images/dislike",data);
}

export function generateKey() {
    return $http.get(`/hana/system/generateKey`);
}

export function likeImage(id,status) {
    return $http.post(`/hana/system/image/like/${id}/${status}`);
}
