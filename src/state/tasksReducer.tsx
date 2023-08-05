import {TasksType} from "../api/typeApi";
import {AddTodolistType, RemoveTodolistType, SetTodolistType} from "./todolistReducer";
import {AllThunkType} from "./store";
import {todolistsAPI} from "../api/todolists-api";


export const tasksReducer = (state: TasksStateReducerType = {}, action: TasksActionReducerType): TasksStateReducerType => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.payload.todo.forEach(el => {
                copyState[el.id] = []
            })
            return copyState
        }
        case "ADD-TODOLIST": {
            return {...state, [action.payload.todolist.id]: []}
        }
        case "REMOVE-TODOLIST": {
            const leftTasks = {...state}
            delete leftTasks[action.payload.todolistId]
            return leftTasks
        }
        default:
            return state
    }
}

export type TasksStateReducerType = {
    [key: string]: TasksType[]
}

export type TasksActionReducerType = SetTodolistType | AddTodolistType | RemoveTodolistType | GetTasksActionType | CreateTaskActionType

export type GetTasksActionType = ReturnType<typeof getTasksAC>
export const getTasksAC = (tasks: TasksType[], TodolistId: string) => {
    return {
        type: "GET-TASKS",
        payload: {tasks, TodolistId}
    } as const
}
export const getTasksTC = (todolistId: string): AllThunkType => {
    return (dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then(res => dispatch(getTasksAC(res.data.items,todolistId)))
    }
}
export type CreateTaskActionType = ReturnType<typeof createTaskAC>
export const createTaskAC = (todolistId: string, title:string) => {
    return {
        type: "CREATE-TASK",
        payload: {todolistId, title}
    } as const
}
export const createTaskTC = (todolistId: string, title:string): AllThunkType => {
    return (dispatch) => {
        todolistsAPI.createTask(todolistId, title)
            .then(res => dispatch(createTaskAC(todolistId, res.data.data.item)))
    }
}