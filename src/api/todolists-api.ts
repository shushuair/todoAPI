import axios, {AxiosResponse} from "axios";
import {
    TasksResponseType, TasksType,

    TodolistType, TodoResponseType, UpdateTaskModelType, UpdateTaskResponseType,
} from "./typeApi";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        "API-KEY": "30526515-95f1-4d41-81b7-50437c774f84"
    }
})

export const todolistsAPI = {
    getTodolists(){
        return instance.get<TodolistType[]>("/todo-lists")
    },
    createTodolist(title:string){
        return instance.post<null, AxiosResponse<TodoResponseType<{item: TodolistType}>>, {title: string}>("/todo-lists", {title})
    },
    removeTodolist(todolistId: string){
        return instance.delete<TodoResponseType>(" /todo-lists/{todolistId}")
    },
    updateTodolist(todolistId: string, title:string){
        return instance.put<null, AxiosResponse<TodoResponseType>,{title: string}>(" /todo-lists/{todolistId}", {title})
    },
    getTasks(todolistId: string){
        return instance.get<TasksResponseType>("/todo-lists/{todolistId}/tasks")
    },
    createTask(todolistId: string, title:string){
        return instance.post<null, AxiosResponse<TodoResponseType<{item:TasksType}>>, {title: string}>("/todo-lists/{todolistId}/tasks", {title})
    },
    removeTask(todolistId: string, taskId:string){
        return instance.delete<TodoResponseType>("/todo-lists/{todolistId}/tasks/{taskId}")
    },
    updateTask(todolistId: string, taskId:string, model: UpdateTaskModelType){
        return instance.put<null, AxiosResponse<UpdateTaskResponseType>, UpdateTaskModelType>("/todo-lists/{todolistId}/tasks/{taskId}", model)
    }
}



// import axios, {AxiosResponse} from "axios";
// import {
//     NewTaskType, RemoveTaskType,
//     RemoveTodolistResponseType,
//     TasksResponseType,
//     TodolistResponseType, TodolistResponseType2,
//     TodolistType, UpdateTaskType
// } from "./typeApi";
//
// const instance = axios.create({
//     baseURL: "https://social-network.samuraijs.com/api/1.1",
//     withCredentials: true,
//     headers: {
//         "API-KEY": "30526515-95f1-4d41-81b7-50437c774f84"
//     }
// })
//
// export const todolistsAPI = {
//     createTodolist(title: string){
//         return instance.post<null, AxiosResponse<TodolistResponseType>, {title: string}>("/todo-lists",{title})
//     },
//     getTodolists(){
//         return instance.get<TodolistType[]>("/todo-lists")
//     },
//     removeTodolist(todolistId: string){
//         return instance.delete<null, AxiosResponse<RemoveTodolistResponseType>>(" /todo-lists/{todolistId}")
//     },
//     updateTodolist(todolistId: string, title: string){
//         return instance.put<null, AxiosResponse<RemoveTodolistResponseType>, {title: string}>("/todo-lists/{todolistId}",{title})
//     },
//     getTasks(todolistId: string){
//         return instance.get<null, AxiosResponse<TasksResponseType>>("/todo-lists/{todolistId}/tasks")
//     },
//     createNewTask(todolistId: string, title: string){
//         return instance.post<null, AxiosResponse<NewTaskType>,{title: string}>("/todo-lists/{todolistId}/tasks",{title})
//     },
//     removeTask(todolistId: string, taskId: string){
//         return instance.delete<null, AxiosResponse<RemoveTaskType>>("/todo-lists/{todolistId}/tasks/{taskId}")
//     },
//     updateTask(todolistId: string, taskId: string, model: UpdateTaskType){
//         return instance.put<null, AxiosResponse<NewTaskType>,UpdateTaskType>("/todo-lists/{todolistId}/tasks/{taskId}",model)
//     }
// }
//
