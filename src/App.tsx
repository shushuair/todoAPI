import React from 'react';
import './App.module.css';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {Todolists} from "./components/Todolists/Todolists";
import {RootStateType, useAppDispatch} from "./Redux/store";
import {addTodolistTC} from "./Redux/Reducers/todolistReducer";

import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import {RequestStatusType} from "./Redux/Reducers/appReducer";
import {useSelector} from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./components/Login/Login";
import s from "./App.module.css"

function App() {
    const status = useSelector<RootStateType, RequestStatusType>((state)=> state.App.status)
    const dispatch = useAppDispatch()
    const addNewTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography>
                        News
                    </Typography>
                </Toolbar>
                {status === "loading" && <LinearProgress />}
            </AppBar>
            {/*<h1>TODOLISTS</h1>*/}
            {/*<h3>Add Todolist</h3>*/}
            <div className={s.App_addItemForm}>
                <AddItemForm addItem={addNewTodolist}/>
            </div>
            <Container fixed>
                <Routes>
                    <Route path="/" element = {<Todolists/>} />
                    <Route path="/login" element = {<Login/>} />
                    <Route path="404" element = {<h1>404: PAGE NOT FOUND</h1>} />
                    <Route path="*" element = {<Navigate to="/404"/>} />
                </Routes>
            </Container>
        </div>
    );
}

export default App;
