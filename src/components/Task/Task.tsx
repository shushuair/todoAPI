import React, {ChangeEvent} from 'react';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete"
import {useAppDispatch} from "../../Redux/store";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {changeTaskTC, deleteTaskTC} from "../../Redux/Reducers/tasksReducer";
import {TaskStatuses} from "../../api/typeApi";
import Checkbox from "@mui/material/Checkbox";
import {RequestStatusType} from "../../Redux/Reducers/appReducer";
import s from "./Task.module.css"


export type TaskPropsType = {
    todolistId: string
    taskId: string
    taskTitle: string
    checked: number
    entityStatus: RequestStatusType
}

export const Task = (props: TaskPropsType) => {
    const {todolistId, taskId, taskTitle, checked} = props
    const dispatch = useAppDispatch()

    const onTaskTitleChangeHandler = (newTitle: string) => {
        dispatch(changeTaskTC(todolistId, taskId, {title: newTitle}))
    }
    const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked
        const status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(changeTaskTC(todolistId,taskId, {status}))
    }

    const deleteTaskHandler = () => {
        dispatch(deleteTaskTC(todolistId, taskId))
    }
    const checkedStatus = checked === 2

    return (
        <div className={s.TaskWrapper}>
            <Checkbox checked={checkedStatus} onChange={onStatusChangeHandler}/>

            <EditableSpan value={taskTitle} onChange={onTaskTitleChangeHandler} disabled={props.entityStatus === 'loading'}/>
            <IconButton aria-label="delete" size="large">
                <DeleteIcon onClick={deleteTaskHandler}/>
            </IconButton>
        </div>
    );
};
