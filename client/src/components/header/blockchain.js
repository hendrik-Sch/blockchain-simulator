import React, { Fragment, useContext, useEffect, useState } from 'react';

import { Dialog, DialogContent, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import SocketContext from '../../context/socket';

import BlockchainDisplay from '../blockchainDisplay';

function Blockchain() {
    const socket = useContext(SocketContext);

    const [openDialog, setOpenDialog] = useState(false);
    const [blockchain, setBlockchain] = useState();

    useEffect(() => {
        if (socket) {
            socket.on('blockchain', (newBlockchain) => {
                setBlockchain(newBlockchain);
            });
        }
    }, [socket]);

    const handleClick = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <Fragment>
            <IconButton onClick={handleClick}>
                <VisibilityIcon />
            </IconButton>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogContent>
                    <BlockchainDisplay blockchain={blockchain} />
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}

export default Blockchain;