import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootStateType, useAppDispatch} from "../../state/store";
import {Task} from "../Task/Task";
import {FilterValuesType, TasksType} from "../../api/typeApi";

export type TasksPropsType = {
    todolistId: string
    filterStatus: FilterValuesType
}

export const Tasks = (props:TasksPropsType) => {
    const dispatch = useAppDispatch()
    let {todolistId, filterStatus} = props
    let tasks = useSelector<RootStateType, TasksType[]>(state => state.tasks[todolistId])
    let filteredTasks = tasks
    if(filterStatus === "active"){
        filteredTasks = tasks.filter(el=>!el.completed)
    }
    if(filterStatus === "completed"){
        filteredTasks = tasks.filter(el=>el.completed)
    }
    useEffect(()=>{
        dispatch(getTasksTC(todolistId))
    })
    return (
        <div>
            {filteredTasks.map(el => {
                return (
                    <Task
                        key = {el.id}
                        todolistId = {todolistId}
                        taskId = {el.id}
                        taskTitle = {el.title}
                        checked={el.completed}
                    />
                )
            })}
        </div>
    );
};
