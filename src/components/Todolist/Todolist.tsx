import React from 'react';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Tasks} from "../Tasks/Tasks";
import {FilterValuesType} from "../../api/typeApi";
import {useAppDispatch} from "../../state/store";
import {EditableSpan} from "../EditableSpan/EditableSpan";

import {changeTodoTitleTC, removeTodolistTC} from "../../state/todolistReducer";
// import {Button} from "@mui/material";
import {Button} from "../Button/Button";
import {addTaskTC} from "../../state/tasksReducer";


export type TodoPropsType = {
    todolistId: string
    todolistTitle: string
}

export const Todolist = (props: TodoPropsType) => {
    const {todolistId, todolistTitle} = props
    const dispatch = useAppDispatch()
    const deleteTodoHandler = () => {
        dispatch(removeTodolistTC(todolistId))
    }
    const editTodoTitleHandler = (title: string) => {
        dispatch(changeTodoTitleTC(todolistId, title))
    }
    const onChangeHandler = (newValue: string) => {
        dispatch(addTaskTC(todolistId, newValue))
    }
    return (
        <div>
            <div>
                <h2>
                    <EditableSpan value={todolistTitle} onChange={editTodoTitleHandler}/>
                </h2>
                <Button name={"X"} callback={deleteTodoHandler}/>
            </div>
            <div>
                <AddItemForm addItem={onChangeHandler}/>
            </div>
            <Tasks todolistId={todolistId}/>
            <div>
                <button>all</button>
                <button>active</button>
                <button>completed</button>
            </div>

           {/*<Button variant="contained">All</Button>*/}
           {/*<Button>Active</Button>*/}
           {/*<Button>Completed</Button>*/}
           {/* <Button name={"all"} callback={}/>*/}
           {/* <Button name={"active"} callback={}/>*/}
           {/* <Button name={"completed"} callback={}/>*/}
        </div>
    );
};