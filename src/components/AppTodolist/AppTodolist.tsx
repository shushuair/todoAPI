import React from 'react';
import s from "../../App.module.css";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Todolists} from "../Todolists/Todolists";
import {addTodolistTC} from "Redux/Reducers/todolistReducer";
import {useAppDispatch, useAppSelector} from "Redux/store";
import {Navigate} from "react-router-dom";

export const AppTodolist = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>(state=>state.Auth.isLoggedIn)
    const addNewTodolist = (title: string) => {
        dispatch(addTodolistTC(title))}
    if(!isLoggedIn){
        return <Navigate to={"/login"} />
    }
    return (
        <div>
            <h1>TODOLISTS</h1>
            <h3>Add Todolist</h3>
            <div className={s.App_addItemForm}>
                <AddItemForm addItem={addNewTodolist}/>
            </div>
            <Todolists />
        </div>
    );
};