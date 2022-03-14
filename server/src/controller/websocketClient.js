const { v4 } = require('uuid');
const uuidv4 = v4;

// const mailboxCache = new Object();

class WebsocketClient {
    constructor(socket) {
        this._id = uuidv4();
        this._socket = socket;
        this._role = null;

        // this._mailbox = new Array();
    }

    set role(role) {
        // if (role === null) {
        //     this._role = null;

        //     this._mailbox = new Array();

        //     return;
        // }

        // if (!mailboxCache[role]) {
        //     mailboxCache[role] = new Array();
        // }
        // this._mailbox = mailboxCache[role];

        this._role = role;
    }

    get role() {

        return this._role;
    }

    get id() {

        return this._id;
    }

    get socket() {

        return this._socket;
    }

    // get mailbox() {

    //     return this._mailbox.length;
    // }

    toJsonString() {
        return JSON.stringify({
            id: this._id
        });
    }
}

module.exports = WebsocketClient;