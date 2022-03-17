const Block = require('./blockchain/Block');
const BlockChain = require('./blockchain/Chain');
const Mailbox = require('./controller/mailbox');
const StartHttpServer = require('./connections/http/');
const { StartWebsocketServer, WebSocketClients } = require('./connections/Websocket/');
const Logger = require('./Logger');

const SmartContracts = [
    {
        trigger: {
            type: "position switch",
            usePrefix: true,
            source: "H",
            target: "LKW"
        },
        result: {
            role: "customer",
            message_renderer: (evtData) => `Auftragsbestätigung für Produkt "${Number(evtData.product_id)}" erhalten`
        }
    },
    {
        trigger: {
            type: "position switch",
            usePrefix: true,
            source: "LKW",
            target: "H"
        },
        result: {
            role: "manufacturer",
            message_renderer: (evtData) => `Lieferschein für Zutat ${evtData.ingredient_id} – "${evtData.ingredient}" erhalten`
        }
    },
    {
        trigger: {
            type: "position switch",
            usePrefix: true,
            source: "LKW",
            target: "E"
        },
        result: {
            role: "customer",
            message_renderer: (evtData) => `Lieferschein für Produkt "${Number(evtData.product_id)}" erhalten`
        }
    },
    {
        trigger: {
            type: "product evaluated",
            isOkay: true
        },
        result: {
            role: "customer",
            message_renderer: (evtData) => `Rechnung für Produkt "${Number(evtData.product_id)}" erhalten`
        }
    },
    {
        trigger: {
            type: "product evaluated",
            isOkay: false
        },
        result: {
            role: "manufacturer",
            message_renderer: (evtData) => `Reklamation für Produkt "${Number(evtData.product_id)}" erhalten`
        }
    }
];

function fillBlockchainWithInitialData(blockchain) {

    let nextIngredientId = 0;
    const Z_TS = new Block({
        ingredient_id: nextIngredientId++,
        position: "Z",
        ingredient: "Tomatensauce"
    });
    blockchain.addNewBlock(Z_TS);
    const Z_MM = new Block({
        ingredient_id: nextIngredientId++,
        position: "Z",
        ingredient: "Hackfleisch"
    });
    blockchain.addNewBlock(Z_MM);
    const Z_P = new Block({
        ingredient_id: nextIngredientId++,
        position: "Z",
        ingredient: "Nudeln"
    });
    blockchain.addNewBlock(Z_P);

    const fillManufacturerInitialStock = () => {
        const H_TS = new Block({
            ingredient_id: nextIngredientId++,
            position: "H-A1",
            ingredient: "Tomatensauce"
        });
        blockchain.addNewBlock(H_TS);
        const H_MM = new Block({
            ingredient_id: nextIngredientId++,
            position: "H-A2",
            ingredient: "Hackfleisch"
        });
        blockchain.addNewBlock(H_MM);
        const H_P = new Block({
            ingredient_id: nextIngredientId++,
            position: "H-B1",
            ingredient: "Nudeln"
        });
        blockchain.addNewBlock(H_P);
    };

    fillManufacturerInitialStock();
    fillManufacturerInitialStock();
    fillManufacturerInitialStock();
    fillManufacturerInitialStock();
};

function GenerateSmartContractEvent(trigger) {
    if (trigger.type === "position switch") {

        return `${trigger.type} ${trigger.source} to ${trigger.target}`;
    }

    if (trigger.type === "product evaluated") {
        if (trigger.isOkay === true) {

            return `product accepted`;
        }

        return `product declined`;
    }
}

(async () => {
    const httpServer = await StartHttpServer();
    const websocketServer = StartWebsocketServer(httpServer);

    const MailboxRegister = ["customer", "manufacturer", "blockchain"]
        .reduce((register, role) => {
            register[role] = new Mailbox(role);

            return register;
        }, {});

    const blockchain = new BlockChain();

    // const smartContract01 = new Block({
    //     message: "SmartContract registriert",
    //     details: "Wenn der Endkunde das Produkt als \"in Ordnung\" bewertet, erhält dieser automatisch eine Rechnung vom Hersteller."
    // });
    // blockchain.addNewBlock(smartContract01);

    fillBlockchainWithInitialData(blockchain);

    let takt = 1;
    let phase = 1;

    websocketServer.on('connection', (socket) => {
        const client = WebSocketClients.get(socket);

        socket.on('select role', (newRole) => {
            client.role = newRole;

            Logger.info(`Client "${client.id}" selected role: ${client.role}`);

            const mailbox = MailboxRegister[client.role];
            if (!mailbox) {
                Logger.debug(`No mailbox for role: ${client.role} created`);

                return;
            }
            socket.emit('unread mails', mailbox.unreadMails);
        });
        socket.on('deselect role', () => {
            const formerRole = client.role;
            client.role = null;

            Logger.info(`Client "${client.id}" deselected its role: ${formerRole}`);
        });

        socket.on('add block', (newBlockData) => {
            try {
                const newBlock = new Block(newBlockData);
                blockchain.addNewBlock(newBlock);
                websocketServer.emit('blockchain', blockchain);
            } catch (error) {
                Logger.error(`Could not add block: ${error.message}`);
            }
        });

        socket.on('next time', () => {
            if (phase === 1) {
                phase++;
            } else {
                takt++;
                phase = 1;
            }

            websocketServer.emit('time', { takt, phase });
        });

        socket.on('request time', () => {
            socket.emit('time', { takt, phase });
        });
        socket.on('request blockchain', () => {
            socket.emit('blockchain', blockchain);
        });
        socket.on('request unread mails', () => {
            const mailbox = MailboxRegister[client.role];
            if (!mailbox) {
                Logger.debug(`No mailbox for role: ${client.role} created`);

                return;
            }
            socket.emit('unread mails', mailbox.unreadMails);
        });
        socket.on('request mails', () => {
            const mailbox = MailboxRegister[client.role];
            if (!mailbox) {
                Logger.debug(`No mailbox for role: ${client.role} created`);

                return;
            }
            socket.emit('mails', mailbox.readMails());
        });

        SmartContracts.forEach((contract, index) => {
            const { trigger, result } = contract;

            const event = GenerateSmartContractEvent(trigger);

            if (!event) {
                Logger.debug(`missconfigred smart contract at index: "${index}"`)

                return;
            }

            Logger.debug(`client ${client.id} registered smart contract on: ${event}`);

            socket.on(event, (eventData) => {
                const targetMailbox = MailboxRegister[result.role];
                if (!targetMailbox) {
                    Logger.debug(`No mailbox for role: ${result.role} created`);

                    return;
                }

                targetMailbox.newMail(result.message_renderer(eventData));

                for (const [clientSocket, currentClient] of WebSocketClients.entries()) {
                    if (currentClient.role === result.role) {
                        clientSocket.emit("unread mails", targetMailbox.unreadMails);
                    }
                }
            });
        });
    });
})();