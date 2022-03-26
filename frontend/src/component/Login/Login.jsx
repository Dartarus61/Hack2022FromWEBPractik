import React, { useState } from 'react';
import s from "./Login.module.css";
import TextField from "@mui/material/TextField";
import Link from "../Link/Link";
import { Button } from '@mui/material';
import { Navigate } from "react-router-dom";
let Login = () => {

    const [loading, setLoadig] = useState(true);
    const [state, setState] = useState("")
    const [fieldValues, setFieldValues] = useState({
        login: '',
        password: '',
        secretWord: ''
    })

    const onChangeFields = (e) => {
        setFieldValues(
            {
                ...fieldValues,
                [e.target.id]: e.target.value
            }
        );
    }
    const onClickButtonLogin = async () => {
        console.log(fieldValues);
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(fieldValues)
        });
        if(response){
            setState("/dashboard")
        }
    }

    if(state == "/dashboard"){
        return <Navigate to={state} />
    }
    else{
        return (
            <div className={s.container}>
                <div className={s.login}>
                    <p className={s.containerText}>Вход</p>
                    <TextField className={s.input} value={fieldValues.login} onChange={onChangeFields} id="login" label="login" variant="outlined" margin="normal" />
                    <TextField className={s.input} value={fieldValues.password} onChange={onChangeFields} id="password" label="password" margin="normal" />
                    <TextField className={s.input} value={fieldValues.secretWord} onChange={onChangeFields} id="secretWord" label="secret word" margin="normal" />
                    <div className={s.push}>
                        <Link text="Регистрация" link="register" />
                        <Button  className={s.button} variant="contained" onClick={onClickButtonLogin}>Вход</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login; 