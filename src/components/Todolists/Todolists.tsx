import React from 'react';
import {Todo} from "../Todo/Todo";
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
                    <Todo
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
