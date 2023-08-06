import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootStateType, useAppDispatch} from "../../state/store";
import {Task} from "../Task/Task";
import {FilterValuesType, TasksType} from "../../api/typeApi";
import {getTasksTC, TasksStateReducerType} from "../../state/tasksReducer";

export type TasksPropsType = {
    todolistId: string
}

export const Tasks = (props:TasksPropsType) => {
    const dispatch = useAppDispatch()
    let {todolistId} = props
    let tasks = useSelector<RootStateType, TasksStateReducerType>(state => state.Tasks)
    let filteredTasks = tasks
    // if(filterStatus === "active"){
    //     filteredTasks = tasks.filter(el=>!el.completed)
    // }
    // if(filterStatus === "completed"){
    //     filteredTasks = tasks.filter(el=>el.completed)
    // }
    useEffect(()=>{
        dispatch(getTasksTC(todolistId))
    },[])
    return (
        <div>
            {tasks[todolistId].map(el => {
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
