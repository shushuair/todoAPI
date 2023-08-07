import React from 'react';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete"
import {useAppDispatch} from "../../state/store";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {changeTaskTC, deleteTaskTC} from "../../state/tasksReducer";

export type TaskPropsType = {
    todolistId: string
    taskId: string
    taskTitle: string
    checked: number
}

export const Task = (props: TaskPropsType) => {
    const {todolistId, taskId, taskTitle, checked} = props
    const dispatch = useAppDispatch()
    const onTaskTitleChangeHandler = (newTitle: string) => {
        dispatch(changeTaskTC(todolistId,taskId,newTitle))
    }
    // const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     const changedIsDoneValue = e.currentTarget.checked
    //     const status = changedIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
    //     dispatch(changeTaskTC(todolistId, taskId, {status}))
    // }
    const deleteTaskHandler = () => {
        dispatch(deleteTaskTC(todolistId, taskId))
    }
    const checkedStatus = checked === 2

    return (
        <div>
            {/*<Checkbox checked={checkedStatus} onChange={onStatusChangeHandler}/>*/}
            <EditableSpan value={taskTitle} onChange={onTaskTitleChangeHandler}/>
            <IconButton aria-label="delete" size="large">
                <DeleteIcon onClick={deleteTaskHandler}/>
            </IconButton>
        </div>
    );
};
