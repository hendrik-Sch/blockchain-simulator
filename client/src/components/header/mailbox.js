import React, { Fragment, useContext, useEffect, useState } from 'react';

import { Badge, ClickAwayListener, IconButton, List, ListItem, Paper, Popper, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';

import SocketContext from '../../context/socket';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2)
    }
}));

function Mailbox() {
    const socket = useContext(SocketContext);
    const classes = useStyles();

    const [unreadMails, setUnreadMails] = useState(0);
    const [mails, setMails] = useState();
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        if (socket) {
            socket.on('unread mails', (unreadMails) => {
                setUnreadMails(unreadMails);
            });

            socket.on('mails', (newMails) => {
                setMails(newMails);
            });
        }
    }, [socket]);

    const handleClick = ({ target }) => {
        setAnchorEl(target);
        socket.emit('request mails');
        socket.emit('request unread mails');
    };

    const handleClickAway = () => {
        setAnchorEl(null);
    };

    const emptyLabel = "Keine Nachrichten.";
    const openPopper = Boolean(anchorEl);

    return (
        <Fragment>
            <IconButton size="small" onClick={handleClick}>
                <Badge
                    badgeContent={unreadMails}
                    color="primary"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <MailIcon />
                </Badge>
            </IconButton>
            <Popper open={openPopper} anchorEl={anchorEl} placement="bottom-end">
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Paper className={classes.paper}>
                        {mails ?
                            <List>
                                {mails.map(mail => (
                                    <ListItem key={mail.id}>
                                        {mail.message}
                                    </ListItem>
                                ))}
                            </List>
                            : <Typography>{emptyLabel}</Typography>}
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </Fragment>
    );
}

export default Mailbox;