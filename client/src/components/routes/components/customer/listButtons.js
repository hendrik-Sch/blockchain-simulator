import React from 'react';

import { makeStyles } from '@mui/styles';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';

const useStyles = makeStyles(() => ({
    container: {
        width: 200
    }
}));

function ListButtons() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <IconButton edge="end" color="success">
                <DoneIcon />
            </IconButton>
            <IconButton edge="end" color="error">
                <ClearIcon />
            </IconButton>
        </div>
    );
}

export default ListButtons;