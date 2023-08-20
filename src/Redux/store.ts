import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {TasksReducer, TasksReducerActionType} from "./Reducers/tasksReducer";
import {TodolistReducer, TodolistReducerActionType} from "./Reducers/todolistReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppReducer, AppReducerActionsType} from "./Reducers/appReducer";
import {authReducer, AuthReducerType} from "./Reducers/authReducer";



export const RootState = combineReducers({
    Tasks: TasksReducer,
    Todolists: TodolistReducer,
    App: AppReducer,
    Auth: authReducer
})
export const store = createStore(RootState, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof RootState>
//all action types for app
export type AllActionsType = TodolistReducerActionType | TasksReducerActionType | AppReducerActionsType | AuthReducerType
export type AppDispatchType = ThunkDispatch<RootStateType, unknown, AnyAction>
//redux documentation
export type AllThunkType<ReturnType=void>=ThunkAction<ReturnType, RootStateType, unknown, AllActionsType>
export const useAppDispatch=useDispatch<AppDispatchType>;
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
