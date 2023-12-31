import axios, {AxiosResponse} from "axios";
import {
    ChangeTaskModelType,
    ChangeTaskResponseType,
    TasksResponseType,
    TasksType,
    TodolistType,
    TodoResponseType,
} from "./typeApi";
import {FormikErrorType} from "../components/Login/Login";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "30526515-95f1-4d41-81b7-50437c774f84"
    }
})

export const authAPI = {
    login(data: FormikErrorType) {
        return instance.post<null, AxiosResponse<TodoResponseType<{userId: number}>>, FormikErrorType>("auth/login", data)
    },
    me() {
        return instance.get<TodoResponseType<{
            id: number,
            email: string,
            login: string
        }>>('/auth/me')
    },
    logout() {
        return instance.delete<TodoResponseType<{data: {}}>>('/auth/login')
    }
}

export const todolistsAPI = {
    getTodolists(){
        return instance.get<TodolistType[]>("todo-lists")
    },
    addTodolist(title:string){
        return instance.post<null, AxiosResponse<TodoResponseType<{item: TodolistType}>>,
            {title: string}>("todo-lists", {title})
    },
    removeTodolist(todolistId: string){
        return instance.delete<TodoResponseType>(`todo-lists/${todolistId}`)
    },
    changeTodolist(todolistId: string, title:string){
        return instance.put<null, AxiosResponse<TodoResponseType>,{title: string}>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string){
        return instance.get<TasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    addTask(todolistId: string, title:string){
        return instance.post<null, AxiosResponse<TodoResponseType<{item:TasksType}>>, {title: string}>(`todo-lists/${todolistId}/tasks`, {title})
    },
    removeTask(todolistId: string, taskId:string){
        return instance.delete<TodoResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    changeTask(todolistId: string, taskId:string, domainModel: ChangeTaskModelType){
        return instance.put<null, AxiosResponse<ChangeTaskResponseType>, ChangeTaskModelType>(`todo-lists/${todolistId}/tasks/${taskId}`, domainModel)
    },

}
