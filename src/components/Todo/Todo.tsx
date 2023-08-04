import React from 'react';
import {AddItemForm} from "./AddItemForm";
import {Tasks} from "./Tasks";

export const Todo = () => {
    return (
        <div>
            <h2>
                <span>Todolist Name</span>
                <button>X</button>
            </h2>
            <AddItemForm/>
            <Tasks
                todolistId={todolistId}
                filterStatus={filterStatus}
            />
            <button>all</button>
            <button>active</button>
            <button>completed</button>
        </div>
    );
};