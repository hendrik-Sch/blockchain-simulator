import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import IoWebsocket from 'socket.io-client';
import Moment from 'moment';
import 'moment/min/locales';

import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/styles';

import { ConfigProvider } from '../../context/config';
import { SocketProvider } from '../../context/socket';
import MuiTheme from '../../styles/muiTheme';

import Routes from '../routes';
import Header from '../header/';

Moment.locale("de");

const App = (props) => {
    const { config } = props;

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ioSocket = IoWebsocket(config.websocketUrl);

        ioSocket.on("connect", () => {
            const message = `Successfully connected to ${config.websocketUrl} as client: ${ioSocket.id}`;
            console.log(message);
            setSocket(ioSocket);
        });

        return () => {
            ioSocket.close();
            setSocket(null);
        };
    }, []);

    return (
        <ThemeProvider theme={MuiTheme}>
            <ConfigProvider value={config}>
                <SocketProvider value={socket}>
                    <BrowserRouter>
                        <Container maxWidth="md">
                            <CssBaseline />
                            <Header />
                            <Routes />
                        </Container>
                    </BrowserRouter>
                </SocketProvider>
            </ConfigProvider>
        </ThemeProvider>
    );
};

App.propTypes = {
    config: PropTypes.object
};

export default App;
