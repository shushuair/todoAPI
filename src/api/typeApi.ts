export type TodoResponseType<D = {}> = {
    data: D
    messages: string[]
    fieldsErrors?: string[]
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

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TasksType = {
    description: string
    title: string
    completed?: boolean
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


