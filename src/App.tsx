import React, {useEffect} from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {Todolists} from "./components/Todolists/Todolists";
import {useAppDispatch} from "./state/store";
import {addTodolistTC, getTodolistTC} from "./state/todolistReducer";

import Container from "@mui/material/Container";

function App() {
    const dispatch = useAppDispatch()
    const addNewTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
    }

  return (
    <div className="App">
     <div>
       <h1>TODOLISTS</h1>
       <h3>Add Todolist</h3>
         <div>
             <AddItemForm addItem={addNewTodolist}/>
         </div>
        <Container fixed>
            <Todolists/>
        </Container>

     </div>
    </div>
  );
}

export default App;
