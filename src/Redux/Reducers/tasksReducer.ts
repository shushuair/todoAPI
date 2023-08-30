import {ChangeRequestTaskModelType, TasksType, UpdateDomainTaskModelType} from "api/typeApi";
import {AddTodolistType, changeEntityStatusAC, RemoveTodolistType, SetTodolistType} from "./todolistReducer";
import {AllThunkType, RootStateType} from "../store";
import {todolistsAPI} from "api/todolists-api";
import {setAppStatusAC} from "./appReducer";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";

export const TasksReducer = (state: TasksStateReducerType = {}, action: TasksReducerActionType): TasksStateReducerType => {
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
        case "GET-TASKS": {
            return {...state, [action.payload.TodolistId]: [...action.payload.tasks]}
        }
        case "ADD-TASK": {
            return {...state, [action.payload.todolistId]: [action.payload.task, ...state[action.payload.todolistId]]}
        }
        case "CHANGE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(el => el.id === action.payload.taskId ? {...el, ...action.payload.model} : el)
            }
        }
        case "DELETE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(el => el.id !== action.payload.taskId)
            }
        }
        default:
            return state
    }
}

export type TasksStateReducerType = {
    [key: string]: TasksType[]
}

export type TasksReducerActionType = SetTodolistType | AddTodolistType |
    RemoveTodolistType | GetTasksActionType |
    AddTaskActionType | ChangeTaskActionType | DeleteTaskType


export type GetTasksActionType = ReturnType<typeof getTasksAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskActionType = ReturnType<typeof changeTaskAC>
export type DeleteTaskType = ReturnType<typeof deleteTaskAC>

export const getTasksAC = (tasks: TasksType[], TodolistId: string) => {
    return {
        type: "GET-TASKS",
        payload: {tasks, TodolistId}
    } as const
}
export const getTasksTC = (todolistId: string): AllThunkType => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        todolistsAPI.getTasks(todolistId)
            .then(res => {
                dispatch(getTasksAC(res.data.items, todolistId))
                dispatch(setAppStatusAC("idle"))
            })
            .catch((e) => handleServerNetworkError(e, dispatch))
    }
}

export const addTaskAC = (todolistId: string, task: TasksType) => {
    return {
        type: "ADD-TASK",
        payload: {todolistId, task}
    } as const
}
export const addTaskTC = (todolistId: string, title: string): AllThunkType => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.addTask(todolistId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const task = res.data.data.item
                    dispatch(addTaskAC(todolistId, task))
                    dispatch(setAppStatusAC('idle'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((e) => handleServerNetworkError(e, dispatch))
    }
}

export const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "DELETE-TASK",
        payload: {todolistId, taskId}
    } as const
}
export const deleteTaskTC = (todolistId: string, taskId: string): AllThunkType => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeEntityStatusAC(todolistId, 'loading'))
        todolistsAPI.removeTask(todolistId, taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(deleteTaskAC(todolistId, taskId))
                    dispatch(setAppStatusAC('idle'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((e) => handleServerNetworkError(e, dispatch))
    }
}

export const changeTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {
        type: 'CHANGE-TASK',
        payload: {todolistId, taskId, model}
    } as const
}
export const changeTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AllThunkType => {
    return (dispatch, getState: () => RootStateType) => {

        const state = getState()
        dispatch(setAppStatusAC('loading'))
        const task = state.Tasks[todolistId].find(task => task.id === taskId)
        if (!task) {
            return
        }
        const apiModel: ChangeRequestTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.changeTask(todolistId, taskId, apiModel)
            .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(changeTaskAC(todolistId, taskId, domainModel))
                        dispatch(setAppStatusAC('idle'))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                }
            )
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
                // dispatch(setAppStatusAC('failed'))
            })
    }
}