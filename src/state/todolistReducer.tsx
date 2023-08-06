import {InitialStateType, TodolistType} from "../api/typeApi";
import {todolistsAPI} from "../api/todolists-api";
import {AllThunkType} from "./store";


export const todolistReducer = (state: InitialStateType[] = [], action: TodolistReducerActionType): InitialStateType[] => {
    switch (action.type){
        case "SET-TODOLISTS": {
            return action.payload.todo.map(el=>{
                return {
                    ...el,filter:"all"
                }
            })
        }
        case "ADD-TODOLIST": {
            return [{...action.payload.todolist,filter:"all"}, ...state]
        }
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case "CHANGE-TITLE": {
            return state.filter(el => el.id === action.payload.todolistId ? {...el, title: action.payload.title} : el)
        }
        default: return state
    }
}

export type TodolistReducerActionType = SetTodolistType | AddTodolistType | RemoveTodolistType | ChangeTodoTitleType

export type AddTodolistType = ReturnType<typeof addTodolistAC>
export type SetTodolistType = ReturnType<typeof setTodolistAC>
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type ChangeTodoTitleType = ReturnType<typeof changeTodoTitleAC>

export const setTodolistAC = (todo:TodolistType[]) => {
    return {
        type: "SET-TODOLISTS",
        payload: {todo}
    } as const
}
export const getTodolistTC = ():AllThunkType => (dispatch) => {
    todolistsAPI.getTodolists()
        .then((res)=>{
            dispatch(setTodolistAC(res.data))
        })
}

export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: "ADD-TODOLIST",
        payload: {todolist}
    } as const
}
export const addTodolistTC = (title:string):AllThunkType => (dispatch) => {
    todolistsAPI.addTodolist(title)
        .then((res)=>{
            dispatch(addTodolistAC(res.data.data.item))
        })
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {todolistId}
    } as const
}
export const removeTodolistTC = (todolistId: string):AllThunkType => (dispatch) => {
    todolistsAPI.removeTodolist(todolistId)
        .then(()=>{
            dispatch(removeTodolistAC(todolistId))
        })
}

export const changeTodoTitleAC = (todolistId: string, title: string) => {
    return {
        type: "CHANGE-TITLE",
        payload: {todolistId, title}
    } as const
}
export const changeTodoTitleTC = (todolistId: string, title: string):AllThunkType => (dispatch) => {
    todolistsAPI.changeTodolist(todolistId, title)
        .then(() => {
            dispatch(changeTodoTitleAC(todolistId, title))
        })
}

