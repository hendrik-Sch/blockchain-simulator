import React, { useContext, useEffect, useState } from 'react';

import { Typography } from '@mui/material';

import SocketContext from '../../../../context/socket';

import ProductList from './productList';

const Customer = () => {
    const socket = useContext(SocketContext);

    const [blockchain, setBlockchain] = useState();

    useEffect(() => {
        if (socket) {
            socket.emit('select role', "customer");
            socket.on('blockchain', (data) => {
                setBlockchain(data);
            });
            socket.emit('request blockchain');
        }

        return () => socket && socket.emit('deselect role');
    }, [socket]);

    return (
        <main>
            <Typography variant="h3">Endkunde</Typography>
            <ProductList
                blockchain={blockchain}
            />
        </main>
    );
};

export default Customer;