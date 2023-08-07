import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootStateType, useAppDispatch} from "../../state/store";
import {Task} from "../Task/Task";
import {FilterValuesType, InitialStateType, TasksType} from "../../api/typeApi";
import {getTasksAC, getTasksTC} from "../../state/tasksReducer";

export type TasksPropsType = {
    todolistId: string
    filterStatus: FilterValuesType
}

export const Tasks = (props:TasksPropsType) => {
    const dispatch = useAppDispatch()
    let {todolistId, filterStatus} = props
    useEffect(()=>{
       dispatch(getTasksTC(todolistId))
    },[])
    let allTasks = useSelector<RootStateType, TasksType[]>(state => state.Tasks[todolistId])
    let filteredTasks = allTasks
    if(filterStatus === "active"){
        filteredTasks = allTasks.filter(el => el.status === 0)
    }
    if(filterStatus === "completed"){
        filteredTasks = allTasks.filter(el => el.status === 2)
    }

    return (
        <div>
            {filteredTasks.map(el => {
                return (
                    <Task
                        key = {el.id}
                        todolistId = {todolistId}
                        taskId = {el.id}
                        taskTitle = {el.title}
                        checked={el.status}
                    />
                )
            })}
        </div>
    );
};
