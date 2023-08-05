import React from 'react';
import {Todolist} from "../Todolist/Todolist";
import {useSelector} from "react-redux";
import {RootReducerType, useAppDispatch} from "../../state/store";
import {InitialStateType, TodolistType} from "../../api/typeApi";


export const Todolists = () => {
    const dispatch = useAppDispatch()
    const todolists = useSelector<RootReducerType, InitialStateType[]>(state => state.todolists)
    return (
        <div>
            {todolists.map(el=>{
                return (
                    <Todolist
                    key={el.id}
                    todolistId={el.id}
                    titleTodolist={el.title}
                    filterStatus={el.filter}
                    />
                )
            })}
        </div>
    );
};
