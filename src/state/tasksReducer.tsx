import {TasksType} from "../api/typeApi";
import {AddTodolistType, RemoveTodolistType, SetTodolistType} from "./todolistReducer";


export const tasksReducer = (state: TasksStateReducerType = {}, action: TasksActionReducerType):TasksStateReducerType => {
    switch (action.type){
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
        default: return state
    }
}

export type TasksStateReducerType = {
    [key: string]: TasksType[]
}

export type TasksActionReducerType = SetTodolistType | AddTodolistType | RemoveTodolistType

