import $http from "../config/axiosConfig";

export async function login(account: any, pass:any) {
    const { data } = await $http.post("/api/system/login", {
        account: account,
        password:pass
    });
    window.localStorage.setItem("token", data);
}

export function fetchSystemConfig() {
    return $http.get("/hana/system/config");
}

export function saveConfig(data: any) {
    return $http.post("/hana/system/config",data);
}

export function likeImages(data: any) {
    return $http.post("/hana/system/images/like",data);
}
export function dislikeImages(data: any) {
    return $http.post("/hana/system/images/dislike",data);
}

export function generateKey() {
    return $http.get(`/hana/system/generateKey`);
}

export function likeImage(id: any,status: any) {
    return $http.post(`/hana/system/image/like/${id}/${status}`);
}
