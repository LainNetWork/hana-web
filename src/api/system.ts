import $http from "../config/axiosConfig";

export async function login(account: string, pass:string) {
    const jwt = await $http.post<any,string>("/api/system/login", {
        account: account,
        password:pass
    });
    window.localStorage.setItem("token", jwt);
}
export interface SystemConfig {
    proxy: string
    projectBaseUrl: string
    pixivCookie:string
    systemToken:string
    adminAccount:string
    adminPassword:string
    tencentOssBaseUrl:string
    tencentOssSecretID:string
    tencentOssSecretKey:string
}

export function fetchSystemConfig(): Promise<SystemConfig>{
    return $http.get("/hana/system/config");
}

export function saveConfig(data: SystemConfig) {
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
