import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {RootStateType, useAppDispatch, useAppSelector} from "../../Redux/store";
import {useDispatch, useSelector} from "react-redux";
import {setAppErrorAC} from "../../Redux/Reducers/appReducer";
import {useState} from "react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    const errorStatus = useAppSelector<string | null>(state => state.App.error)
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(true)
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        //это если юзер случайно нажмёт мимо, и чтобы ошибка не пропала
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false)
        console.log(errorStatus)
        //зануляем ошибку
        dispatch(setAppErrorAC(null))
    };

    return (

        <Snackbar open={errorStatus !== null} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {errorStatus}
            </Alert>
        </Snackbar>
    )
}