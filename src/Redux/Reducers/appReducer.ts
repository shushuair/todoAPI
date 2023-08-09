export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null
}

type InitialStateType = {
    status: RequestStatusType
    error: string|null
}
export const AppReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-STATUS':
            return {...state, status: action.payload.status}
        case 'SET-ERROR':
            return {...state, error: action.payload.error}
        default:
            return state
    }
}

export type AppReducerActionsType = ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>

export const setAppStatusAC =(status: RequestStatusType)=>{
    return {
        type: 'SET-STATUS',
        payload: {status}
    } as const
}
export const setAppErrorAC =(error: string|null)=>{
    return {
        type: 'SET-ERROR',
        payload: {error}
    } as const
}