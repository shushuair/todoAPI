import React from 'react';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Tasks} from "../Tasks/Tasks";
import {FilterValuesType} from "../../api/typeApi";
import {useAppDispatch} from "../../state/store";
import {EditableSpan} from "../EditableSpan/EditableSpan";

import {changeTodoTitleTC, newStatusFilterAC, removeTodolistTC} from "../../state/todolistReducer";
import Button from "@mui/material/Button";
// import {Button} from "../Button/Button";
import {addTaskTC} from "../../state/tasksReducer";
import Delete from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {useDispatch} from "react-redux";
import ButtonGroup from "@mui/material/ButtonGroup";


export type TodoPropsType = {
    todolistId: string
    todolistTitle: string
    filterStatus: FilterValuesType


}

export const Todolist = (props: TodoPropsType) => {
    const {todolistId, todolistTitle,filterStatus} = props
    const dispatch = useAppDispatch()
    const removeTodolistHandler = () => {
        dispatch(removeTodolistTC(todolistId))
    }
    const editTodoTitleHandler = (title: string) => {
        dispatch(changeTodoTitleTC(todolistId, title))
    }
    const onChangeHandler = (newValue: string) => {
        dispatch(addTaskTC(todolistId, newValue))
    }
    const newStatusFilterButton = (newStatusFilter: FilterValuesType) => {
        dispatch(newStatusFilterAC(todolistId, newStatusFilter))
    }


    return (
        <div>
            <div>
                <h2>
                    <EditableSpan value={todolistTitle} onChange={editTodoTitleHandler}/>
                </h2>
                {/*<Button name={"X"} callback={deleteTodoHandler}/>*/}
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>

            </div>
            <div>
                <AddItemForm addItem={onChangeHandler}/>
            </div>
            <Tasks todolistId={todolistId} filterStatus={filterStatus}/>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">

                <Button onClick={() => newStatusFilterButton("all")} >All</Button>
                <Button onClick={() => newStatusFilterButton("active")} >Active</Button>
                <Button onClick={() => newStatusFilterButton("completed")} >Completed</Button>
            </ButtonGroup>


            {/* <Button name={"all"} callback={}/>*/}
            {/* <Button name={"active"} callback={}/>*/}
            {/* <Button name={"completed"} callback={}/>*/}
        </div>
    );
};