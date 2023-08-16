import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {RootState, RootStateType} from "../../Redux/store";
import {useDispatch, useSelector} from "react-redux";
import {setAppErrorAC} from "../../Redux/Reducers/appReducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        //это если юзер случайно нажмёт мимо, и чтобы ошибка не пропала
        if (reason === 'clickaway') {
            return;
        }
        //зануляем ошибку
        dispatch(setAppErrorAC(null))
    };
const error = useSelector<RootStateType, string | null>(state => state.App.error)
    // const isOpen = error !== null
    return (

            <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
    )
}