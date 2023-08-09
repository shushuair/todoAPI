import React, {useCallback, useEffect} from 'react';
import {Todolist} from "../Todolist/Todolist";
import {useSelector} from "react-redux";
import {RootStateType, useAppDispatch} from "../../Redux/store";
import {FilterValuesType, InitialStateType, TodolistType} from "../../api/typeApi";
import {getTodolistTC, newStatusFilterAC} from "../../Redux/Reducers/todolistReducer";


export const Todolists = () => {
    const dispatch = useAppDispatch()
    const todolists = useSelector<RootStateType, InitialStateType[]>(state => state.Todolists)
    useEffect(() => {
        dispatch(getTodolistTC())
    }, [])

    return (
        <div>
            {todolists.map(el => {

                return (
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        todolistTitle={el.title}
                        filterStatus={el.filter}
                        entityStatus={el.entityStatus}
                    />
                )
            })}
        </div>
    );
};
