import React from 'react';

import { makeStyles } from '@mui/styles';

import Mailbox from './mailbox';
import TimeDisplay from './timeDisplay';
import Blockchain from './blockchain';

const useStyles = makeStyles(() => ({
    header: {
        float: 'right'
    }
}));

function Header() {
    const classes = useStyles();

    return (
        <div className={classes.header}>
            <TimeDisplay />
            <Mailbox />
            <Blockchain />
        </div>
    );
}

export default Header;