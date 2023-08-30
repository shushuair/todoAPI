import {FilterValuesType, InitialStateType, TodolistType} from "api/typeApi";
import {todolistsAPI} from "api/todolists-api";
import {AllThunkType} from "../store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./appReducer";
import {handleServerNetworkError} from "utils/error-utils";


export const TodolistReducer = (state: InitialStateType[] = [], action: TodolistReducerActionType): InitialStateType[] => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            return action.payload.todo.map(el => {
                return {
                    ...el, filter: "all", entityStatus: "idle"
                }
            })
        }
        case "ADD-TODOLIST": {
            return [{...action.payload.todolist, filter: "all", entityStatus: "idle"}, ...state]
        }
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case "CHANGE-TITLE": {
            return state.filter(el => el.id === action.payload.todolistId ? {...el, title: action.payload.title} : el)
        }
        case "NEW-STATUS-FILTER": {
            return state.map(el => el.id === action.payload.todolistId ? {
                ...el,
                filter: action.payload.newStatusFilter
            } : el)
        }
        case "CHANGE-ENTITY-STATUS": {
            return state.map(el => el.id === action.payload.todolistId ? {...el, status: action.payload.status} : el)
        }
        default:
            return state
    }
}

export type TodolistReducerActionType = SetTodolistType | AddTodolistType |
    RemoveTodolistType | ChangeTodoTitleType | NewStatusFilterACType | ChangeEntityStatusACType

export type AddTodolistType = ReturnType<typeof addTodolistAC>
export type SetTodolistType = ReturnType<typeof getTodolistsAC>
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type ChangeTodoTitleType = ReturnType<typeof changeTodoTitleAC>
export type ChangeEntityStatusACType = ReturnType<typeof changeEntityStatusAC>

export const getTodolistsAC = (todo: TodolistType[]) => {
    return {
        type: "SET-TODOLISTS",
        payload: {todo}
    } as const
}
export const getTodolistTC = (): AllThunkType => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(getTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch(error => {
                handleServerNetworkError(error,dispatch)
            })
    }
}

export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: "ADD-TODOLIST",
        payload: {todolist}
    } as const
}
export const addTodolistTC = (title: string): AllThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.addTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('idle'))
            } else {
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch((error) => {
            dispatch(setAppStatusAC(error.message))
        })
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {todolistId}
    } as const
}
export const removeTodolistTC = (todolistId: string): AllThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeEntityStatusAC(todolistId, 'loading'))
    todolistsAPI.removeTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC("idle"))
        })
        .catch(e => {
            dispatch(setAppErrorAC(e.message))
            // dispatch(changeEntityStatusAC(todolistId, 'failed'))
            dispatch(setAppStatusAC('failed'))
        })
}


export const changeTodoTitleAC = (todolistId: string, title: string) => {
    return {
        type: "CHANGE-TITLE",
        payload: {todolistId, title}
    } as const
}
export const changeTodoTitleTC = (todolistId: string, title: string): AllThunkType => (dispatch) => {
    todolistsAPI.changeTodolist(todolistId, title)
        .then(() => {
            dispatch(changeTodoTitleAC(todolistId, title))
        })
}
export type NewStatusFilterACType = ReturnType<typeof newStatusFilterAC>
export const newStatusFilterAC = (todolistId: string, newStatusFilter: FilterValuesType) => {
    return {
        type: "NEW-STATUS-FILTER",
        payload: {todolistId, newStatusFilter}
    } as const
}
export const changeEntityStatusAC = (todolistId: string, status: RequestStatusType) => {
    return {
        type: 'CHANGE-ENTITY-STATUS',
        payload: {todolistId, status}
    } as const
}
