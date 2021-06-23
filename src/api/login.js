import $http from "../config/axiosConfig";

export default async function login(account,pass) {
    const { data } = await $http.post("/api/login", {
        account: account,
        password:pass
    });
    console.log(data)
    window.localStorage.setItem("token", data);
}