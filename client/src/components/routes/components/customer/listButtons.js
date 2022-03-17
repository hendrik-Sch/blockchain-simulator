import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@mui/styles';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';

import SocketContext from '../../../../context/socket';

const useStyles = makeStyles(() => ({
    container: {
        width: 200
    }
}));

function ListButtons(props) {
    const { block } = props;

    const classes = useStyles();

    const socket = useContext(SocketContext);

    const handleOkClick = () => {
        socket && socket.emit('product accepted', block.data);
    };

    const handleNotOkClick = () => {
        socket && socket.emit('product declined', block.data);
    };

    return (
        <div className={classes.container}>
            <IconButton edge="end" color="success" onClick={handleOkClick}>
                <DoneIcon />
            </IconButton>
            <IconButton edge="end" color="error" onClick={handleNotOkClick}>
                <ClearIcon />
            </IconButton>
        </div>
    );
}

ListButtons.propTypes = {
    block: PropTypes.object
};

export default ListButtons;