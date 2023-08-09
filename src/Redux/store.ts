import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {TasksReducer, TasksReducerActionType} from "./Reducers/tasksReducer";
import {TodolistReducer, TodolistReducerActionType} from "./Reducers/todolistReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {AppReducer, AppReducerActionsType} from "./Reducers/appReducer";


export const RootState = combineReducers({
    Tasks: TasksReducer,
    Todolists: TodolistReducer,
    App: AppReducer
})
export const store = createStore(RootState, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof RootState>
export type AllActionsType = TodolistReducerActionType | TasksReducerActionType | AppReducerActionsType
export type AppDispatchType = ThunkDispatch<RootStateType, unknown, AnyAction>
export type AllThunkType<ReturnType=void>=ThunkAction<ReturnType, RootStateType, unknown, AllActionsType>
export const useAppDispatch=useDispatch<AppDispatchType>
