const http = require('http');
const path = require('path');
const express = require('express');

const Config = require('../../loader/config');
const Logger = require('../../Logger/');

const DEFAULT_RESTART_INTERVAL = 10000;

const { port, restartInterval = DEFAULT_RESTART_INTERVAL } = Config.http;

const StartHttpServer = () => {
    return new Promise((resolve) => {
        const app = express();

        const clientPath = __dirname + '/../../../../client/build/';
        app.use(express.static(clientPath));
        app.get('/*', function (req, res) {
            res.sendFile(path.join(clientPath), function (err) {
                if (err) {
                    res.status(500).send(err)
                }
            })
        });
        const server = http.createServer(app);

        server.on('error', (error) => {
            Logger.error(error.message);
            Logger.info(`Retring again in ${restartInterval}ms ...`);

            setTimeout(() => {
                StartHttpServer();
            }, restartInterval);
        });

        server.listen(port, () => {
            Logger.log(`HTTP server successfully started on port: ${port}`);

            resolve(server);
        });
    });
};

// export { StartHttpServer };
module.exports = StartHttpServer;