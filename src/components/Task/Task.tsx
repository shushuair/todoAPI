import React from 'react';
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete"

export type TaskPropsType = {
    todolistId: string
    taskId: string
    taskTitle: string
    checkedStatus: boolean
}

export const Task = (props: TaskPropsType) => {
    const {todolistId, taskId, taskTitle, checkedStatus} = props
    return (
        <div>
            <Checkbox checked={checkedStatus}/>
            <h5>{taskTitle}</h5>
            <IconButton aria-label="delete" size="large">
                <DeleteIcon/>
            </IconButton>
        </div>
    );
};
