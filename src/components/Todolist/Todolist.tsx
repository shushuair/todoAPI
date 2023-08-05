import React from 'react';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Tasks} from "../Tasks/Tasks";
import {FilterValuesType} from "../../api/typeApi";
import {useAppDispatch} from "../../state/store";
import {EditableSpan} from "../EditableSpan/EditableSpan";

import {changeTodoTitleTC, removeTodolistTC} from "../../state/todolistReducer";
// import {Button} from "@mui/material";
import {Button} from "../Button/Button";




export type TodoPropsType = {
    todolistId: string
    titleTodolist: string
    filterStatus: FilterValuesType
}

export const Todolist = (props: TodoPropsType) => {
    const {todolistId, titleTodolist, filterStatus} = props
    const dispatch = useAppDispatch()
    const deleteTodoHandler = () => {
        dispatch(removeTodolistTC(todolistId))
    }
    const editTodoTitleHandler = (title: string) => {
        dispatch(changeTodoTitleTC(todolistId, title))
    }
    const onChangeHandler = (newValue: string) => {
        dispatch(createTaskTC(todolistId, newValue))
    }
    return (
        <div>
            <h2>
                <EditableSpan value={titleTodolist} onChange={editTodoTitleHandler}/>
            </h2>

            <Button name={"X"} callback={deleteTodoHandler}/>
            <AddItemForm addItem={onChangeHandler}/>
            <Tasks
                todolistId={todolistId}
                filterStatus={filterStatus}
            />
            <button>all</button>
            <button>active</button>
            <button>completed</button>
           {/*<Button variant="contained">All</Button>*/}
           {/*<Button>Active</Button>*/}
           {/*<Button>Completed</Button>*/}
           {/* <Button name={"all"} callback={}/>*/}
           {/* <Button name={"active"} callback={}/>*/}
           {/* <Button name={"completed"} callback={}/>*/}
        </div>
    );
};