
export type TodoResponseType<D={}>={
    data: D
    messages: string[]
    fieldsErrors ?: string[]
    resultCode: number
}
export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type InitialStateType = TodolistType & {
    filter: FilterValuesType
}

// export type TodolistResponseType = {
//     data: {
//         item: TodolistType
//     }
//     messages: string[]
//     resultCode: number
// }

// export type RemoveTodolistResponseType = {
//     resultCode: number
//     messages: string[]
//     data: {}
// }

export type TasksType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type TasksResponseType = {
    items: TasksType[]
    totalCount: number
    error: null | string
}



export type RemoveTaskType = {
    resultCode: number
    messages: string[]
    data: {}
}

export type UpdateTaskResponseType = {
    data: {
        item: TodolistType
    }
    messages: string[]
    resultCode: number
}

export type UpdateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}


