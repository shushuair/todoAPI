import React, {useEffect} from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {Todolists} from "./components/Todolists/Todolists";
import {useAppDispatch} from "./state/store";
import {addTodolistTC, getTodolistTC} from "./state/todolistReducer";

function App() {
    const dispatch = useAppDispatch()
    useEffect(()=>{
       dispatch(getTodolistTC())
    },[])
    const addNewTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
    }

  return (
    <div className="App">
     <div>
       <h1>TODOLISTS</h1>
       <h3>Add Todolist</h3>
         <AddItemForm addItem={addNewTodolist}/>
       <Todolists/>
     </div>
    </div>
  );
}

export default App;
