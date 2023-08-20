import {Dispatch} from 'redux'
import {TodoResponseType} from "../api/typeApi";
import {setAppErrorAC, setAppStatusAC} from "../Redux/Reducers/appReducer";

export type AxiosErrorType = { messages: string[] }

type ErrorUtilsDispatchType = Dispatch<ReturnType<typeof setAppErrorAC> | ReturnType<typeof setAppStatusAC>>

// generic function
export const handleServerAppError = <T>(data: TodoResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

// generic function
export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    //зафейлился запрос убираем дозагрузку
    dispatch(setAppStatusAC('failed'))
    dispatch(setAppErrorAC(error.message))


}