const { Server } = require('socket.io');

const Config = require('../../loader/config');
const Logger = require('../../Logger/');

const WebsocketClient = require('../../controller/websocketClient');

const clients = new Map();

const StartWebsocketServer = (httpServer) => {
    const wsServer = new Server(httpServer, Config.websocket);

    wsServer.on('connection', (socket) => {
        const client = new WebsocketClient(socket);
        Logger.info(`Client with id: "${client.id}" connected`);

        socket.on('disconnect', () => {
            Logger.info(`Client with id: "${client.id}" disconneted`);
            clients.delete(client.id);
        });

        clients.set(socket, client);
    });

    return wsServer;
};

// export const WebSocketClients = clients;
// export { StartWebsocketServer };
module.exports = {
    StartWebsocketServer,
    WebSocketClients: clients
};