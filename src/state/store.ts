import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {TasksActionReducerType, tasksReducer} from "./tasksReducer";
import {todolistReducer, TodolistReducerActionType} from "./todolistReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";


export const rootState = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})
export const store = createStore(rootState, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof rootState>
export type AllActionsType = TodolistReducerActionType | TasksActionReducerType
export type AppDispatchType = ThunkDispatch<RootStateType, unknown, AnyAction>
export type AllThunkType<ReturnType=void>=ThunkAction<ReturnType, RootStateType, unknown, AllActionsType>
export const useAppDispatch=useDispatch<AppDispatchType>
