import {setAppStatusAC} from "./appReducer";
import {FormikErrorType} from "../../components/Login/Login";
import {authAPI} from "../../api/todolists-api"
import {AxiosErrorType, handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AllThunkType} from "../store";
import axios from "axios";


const initialState = {
    isLoggedIn: false,
    isInitialized: false
}

export type InitialStateType = typeof initialState
export const authReducer = (state: InitialStateType = initialState, action: AuthReducerType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'IS-INITIALIZED':
            return {...state, isInitialized: action.payload.newValue}
        default:
            return state
    }
}
// actions
export type SetIsLoggedInACType=ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export type IsInitializedACType=ReturnType<typeof isInitializedAC>
export const isInitializedAC=(newValue:boolean)=>{
    return {
        type:"IS-INITIALIZED",
        payload:{newValue}
    }as const
}

// thunks
export const loginTC = (data: FormikErrorType): AllThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.login(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
    } catch (e) {
        if (axios.isAxiosError<AxiosErrorType>(e)) {
            handleServerNetworkError(e, dispatch)
        }
    }
}

export const logoutTC = (): AllThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.logout()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(false))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
    } catch (e) {
        if (axios.isAxiosError<AxiosErrorType>(e)) {
            handleServerNetworkError(e, dispatch)
        }
    }
}

export const isLoggedInTC = (): AllThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.me()
            .then(res => {
                dispatch(isInitializedAC(true))
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    dispatch(setIsLoggedInAC(false))
                    dispatch(setAppStatusAC('succeeded'))
                }
            })
    } catch (e) {
        if (axios.isAxiosError<AxiosErrorType>(e)) {
            handleServerNetworkError(e, dispatch)
        }
    }
}

export type AuthReducerType = SetIsLoggedInACType | IsInitializedACType
