// import {Dispatch} from "redux";
// import {FormikErrorType} from "../../components/Login/Login";
// import {setAppErrorAC, setAppStatusAC} from "./appReducer";
//
// const initialState = {
//     isLoggedIn: false
// }
// type InitialStateType = {
//     isLoggedIn: boolean
// }
// export const authReducer = (state:InitialStateType = initialState, action: ActionsType): InitialStateType  => {
//     switch (action.type) {
//         case "login/SET-IS-LOGGED-IN": {
//             return {...state, isLoggedIn: action.value}
//         }
//         default: return state
//     }
// }
//
// export const setIsLoggedInAC = (value: boolean) => ({
//     type: "login/SET-IS-LOGGED-IN",value} as const)
// export const loginTC = (data: FormikErrorType) => {
//     return (dispatch: Dispatch<ActionsType>) => {
//         dispatch(setAppStatusAC("loading"))
//     }
// }
// type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setAppStatusAC>
//     | ReturnType<typeof setAppErrorAC>

import {Dispatch} from 'redux'
import {setAppErrorAC, setAppStatusAC} from "./appReducer";
import {FormikErrorType} from "./../../components/Login/Login";
import {authAPI} from  "./../../api/todolists-api"
import {handleServerAppError, handleServerNetworkError} from "./../../utils/error-utils";


const initialState = {
    isLoggedIn: false,
    isInitialized: false
}

type InitialStateType = {
    isLoggedIn: boolean
    isInitialized: boolean
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.payload.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setIsInitializedAC = (value: boolean) =>
    ({type: 'login/SET-IS-INITIALIZED', payload: {value}} as const)
// thunks
export const loginTC = (data: FormikErrorType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('idle'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e) => handleServerNetworkError(e, dispatch))
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('idle'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e) => handleServerNetworkError(e, dispatch))
}
export const isLoggedInTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(setIsLoggedInAC(false))
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch)
    } finally {
        dispatch(setIsInitializedAC(true))
    }
}


type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC> | ReturnType<typeof setIsInitializedAC>