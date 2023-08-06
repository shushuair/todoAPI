import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {TasksReducerActionType, tasksReducer} from "./tasksReducer";
import {todolistReducer, TodolistReducerActionType} from "./todolistReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";


export const RootState = combineReducers({
    Tasks: tasksReducer,
    Todolists: todolistReducer
})
export const store = createStore(RootState, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof RootState>
export type AllActionsType = TodolistReducerActionType | TasksReducerActionType
export type AppDispatchType = ThunkDispatch<RootStateType, unknown, AnyAction>
export type AllThunkType<ReturnType=void>=ThunkAction<ReturnType, RootStateType, unknown, AllActionsType>
export const useAppDispatch=useDispatch<AppDispatchType>
