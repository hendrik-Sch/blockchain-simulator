import React, { useContext } from 'react';

import { makeStyles } from '@mui/styles';
import { Button, Typography } from '@mui/material';
import SocketContext from '../../../../context/socket';

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(4)
    }
}));

function Moderator() {

    const classes = useStyles();
    const socket = useContext(SocketContext);

    const handleClick = () => {
        socket.emit('next time');
    };

    return (
        <main>
            <Typography variant="h3">Moderator</Typography>
            <div className={classes.buttonContainer}>
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={handleClick}
                >
                    Phase abgeschlossen
                </Button>
            </div>
        </main>
    );
}

export default Moderator;