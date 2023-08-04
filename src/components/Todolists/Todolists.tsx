import React from 'react';
import {Todo} from "./Todo";
import {useSelector} from "react-redux";
import {RootReducerType} from "../state/store";
import {TodolistType} from "../api/typeApi";
import {StateType} from "../state/todolistReducer";

export const Todolist = () => {
    const todolists = useSelector<RootReducerType, StateType[]>(state => state.todolists)
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
