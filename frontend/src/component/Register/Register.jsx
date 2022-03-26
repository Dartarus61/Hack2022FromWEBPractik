import React, { useState } from 'react';
import s from "./Register.module.css";
import TextField from "@mui/material/TextField";
import { Button } from '@mui/material';

let Register  = () => {

    let data = {}

    const [fieldValues, setFieldValues] = useState({
        name:"",
        surname:"",
        login: '',
        password: '',
        repeatPassword: "",
    })

    const onChangeFields = (e) => {
        setFieldValues(
            {
                ...fieldValues, 
                [e.target.id]: e.target.value
            }
        );
        if (!isValid){

        }
    }

    let register = async () => {
        console.log(fieldValues);
        let response = await fetch('/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(fieldValues)
          });
    }

    function isValid(values, value) {
        if (typeof value !== 'undefined' && value.indexOf('gmail.com') === -1) {
          return false;
        }
        return true;
      }

    return(
        <div className={s.container}>
            <div className={s.register}>
                <p className={s.containerText}>Регистрация</p>
                <TextField className={s.input} value={fieldValues.name} id="name" label="name" variant="outlined" onChange={onChangeFields} margin="dense"  />
                <TextField className={s.input} value={fieldValues.surname} id="surname" label="surname" variant="outlined" onChange={onChangeFields} margin="dense" />
                <TextField className={s.input} value={fieldValues.login} id="login" label="login" variant="outlined" onChange={onChangeFields} margin="dense"  />
                <TextField className={s.input} value={fieldValues.password} id="password" label="password" variant="outlined" onChange={onChangeFields} margin="dense"  />
                <TextField className={s.input} value={fieldValues.repeatPassword} id="repeatPassword" label="repeat password" variant="outlined" onChange={onChangeFields} margin="dense"/>
                <Button variant="contained" margin="normal" onClick={register} >Отправить</Button>
            </div>
        </div>
    )
}

export default Register;