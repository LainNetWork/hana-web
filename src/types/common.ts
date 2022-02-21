export interface PageableMO<T>{
    total: number
    content: T[]
}

export interface RespMO<T>{
    isOK:boolean
    msg:string
    data:T
}