import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {TasksActionReducerType, tasksReducer} from "./tasksReducer";
import {todolistReducer, TodolistReducerActionType} from "./todolistReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootReducerType = ReturnType<typeof rootReducer>
export type AllActionsType = TodolistReducerActionType | TasksActionReducerType
export type AppDispatchType = ThunkDispatch<RootReducerType, unknown, AnyAction>
export type AllThunkType<ReturnType=void>=ThunkAction<ReturnType, RootReducerType, unknown, AllActionsType>
export const useAppDispatch=useDispatch<AppDispatchType>
