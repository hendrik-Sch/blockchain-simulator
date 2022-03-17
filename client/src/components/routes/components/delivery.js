import React, { useContext, useEffect, useState } from 'react';

import { Typography } from '@mui/material';

import SocketContext from '../../../context/socket';

import BlockchainDisplay from '../../blockchainDisplay/';

const Delivery = () => {
    const socket = useContext(SocketContext);

    const [blockchain, setBlockchain] = useState();

    useEffect(() => {
        if (socket) {
            socket.emit('select role', "delivery");
            socket.on('blockchain', (data) => {
                setBlockchain(data);
            });
            socket.emit('request blockchain');
        }

        return () => socket && socket.emit('deselect role');
    }, [socket]);

    return (
        <main>
            <Typography variant="h3">Transportpartner</Typography>
            <BlockchainDisplay blockchain={blockchain} />
        </main>
    );
};

export default Delivery;