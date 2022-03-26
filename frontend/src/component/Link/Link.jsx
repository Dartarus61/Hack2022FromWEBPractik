import React from 'react';
import s from "./Link.module.css";
import { Button } from '@mui/material';
import { NavLink } from "react-router-dom";

let Link = (props) => {
    return (
        <NavLink to={"/" + props.link}  className={s.link}>
            <Button variant="outlined">
                {props.text}
            </Button>
        </NavLink>
    )
}

export default Link;