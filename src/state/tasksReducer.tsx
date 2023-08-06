import {ChangeRequestTaskModelType, ChangeTaskModelType, TasksType} from "../api/typeApi";
import {AddTodolistType, RemoveTodolistType, SetTodolistType} from "./todolistReducer";
import {AllThunkType, RootStateType} from "./store";
import {todolistsAPI} from "../api/todolists-api";

export const tasksReducer = (state: TasksStateReducerType = {}, action: TasksReducerActionType): TasksStateReducerType => {
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
            return {...state, [action.payload.todolistId]: [action.payload.task, ...state[action.payload.todolistId]] }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(el => el.id === action.payload.todolistId ? {...el, ...action.payload.model} : el)
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
        todolistsAPI.getTasks(todolistId)
            .then(res => dispatch(getTasksAC(res.data.items,todolistId)))
    }
}

export const addTaskAC = (todolistId: string, task: TasksType) => {
    return {
        type: "ADD-TASK",
        payload: {todolistId, task}
    } as const
}
export const addTaskTC = (todolistId: string, title:string): AllThunkType => {
    return (dispatch) => {
        todolistsAPI.addTask(todolistId, title)
            .then(res => dispatch(addTaskAC(todolistId, res.data.data.item)))
    }
}

export const changeTaskAC = (todolistId: string, taskId:string, model: ChangeTaskModelType) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {todolistId,taskId,model}
    } as const
}
export const changeTaskTC = (todolistId: string, taskId:string, domainModel: ChangeTaskModelType): AllThunkType => {
    return (dispatch, getState: () => RootStateType) => {
        const state = getState()
        const task = state.Tasks[todolistId].find(task => task.id === taskId)
        if(!task) {
            return
        }
        const model: ChangeRequestTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        todolistsAPI.changeTask(todolistId, taskId, model)
            .then(() => dispatch(changeTaskAC(todolistId, taskId, domainModel)))
    }
}

export const deleteTaskAC = (todolistId: string, taskId:string) => {
    return {
        type: "DELETE-TASK",
        payload: {todolistId, taskId}
    } as const
}
export const deleteTaskTC = (todolistId: string, taskId:string): AllThunkType => {
    return (dispatch) => {
        todolistsAPI.removeTask(todolistId, taskId)
            .then(() => dispatch(deleteTaskAC(todolistId, taskId)))
    }
}