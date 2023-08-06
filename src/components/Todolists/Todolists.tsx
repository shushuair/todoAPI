import React, {useEffect} from 'react';
import {Todolist} from "../Todolist/Todolist";
import {useSelector} from "react-redux";
import {RootStateType, useAppDispatch} from "../../state/store";
import {InitialStateType, TodolistType} from "../../api/typeApi";
import {getTodolistTC} from "../../state/todolistReducer";


export const Todolists = () => {
    const dispatch = useAppDispatch()
    const todolists = useSelector<RootStateType, TodolistType[]>(state => state.Todolists)
    useEffect(()=>{
        dispatch(getTodolistTC())
    },[])
    return (
        <div>
            {todolists.map(el=>{
                return (
                    <Todolist
                    key={el.id}
                    todolistId={el.id}
                    todolistTitle={el.title}
                    />
                )
            })}
        </div>
    );
};
