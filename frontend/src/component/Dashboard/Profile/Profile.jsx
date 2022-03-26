import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import MailIcon from '@mui/icons-material/Mail';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import s from './Profile.module.css';


export default function SwipeableTemporaryDrawer() {
    const [state, setState] = React.useState({
        right: false,
    });

    let user = { roll: "Admin" };
    let str = <ListItem button key={"Админ панель"}><ListItemIcon><AdminPanelSettingsIcon /></ListItemIcon><ListItemText primary={"Админ панель"} /></ListItem>;

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor, str) => (
        <Box
            sx={{ width: anchor === 'bottom' || anchor === 'top' ? 'auto' : 250, justifyContent: "s" }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button key={"Настройки"}>
                    <ListItemIcon>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Настройки"} />
                </ListItem>
                {str}
                <ListItem button key={"Выход"}>
                    <ListItemIcon>
                        <ExitToAppTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Выход"} />
                </ListItem>
            </List>
        </Box>
    );
    console.log(list('right'))
    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button variant="contained" onClick={toggleDrawer(anchor, true)}>{"Menu"}</Button>
                    <p>
                        Файл менеджер
                    </p>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor, str)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}

