import React, { useContext, useEffect, useState } from 'react';

import { Typography } from '@mui/material';

import SocketContext from '../../context/socket';

function TimeDisplay() {
    const socket = useContext(SocketContext);

    const [takt, setTakt] = useState();
    const [phase, setPhase] = useState();

    useEffect(() => {
        if (socket) {
            socket.on('time', ({ takt, phase }) => {
                setTakt(takt);
                setPhase(phase);
            });
            socket.emit('request time');
        }
    }, [socket]);

    if (!takt || !phase) {

        return null;
    }

    const label = `Takt: ${takt} / Phase: ${phase}`;

    return (
        <Typography variant="caption">
            {label}
        </Typography>
    );
}

export default TimeDisplay;
