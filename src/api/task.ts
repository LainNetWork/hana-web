import $http from "../config/axiosConfig";
import {PageableMO} from "../types/common";

export interface TaskInfo {
    id:string
    taskName:string
    count:number
    remainCount:number
    totalPic:number
    notHandledPic:number
    handled:boolean
    createAt:string
}

export function fetchTaskList(form: any):Promise<PageableMO<TaskInfo>> {
    return $http.post("/hana/task/list",form);
}