const { v4 } = require('uuid');
const uuidv4 = v4;

class MailEntry {
    constructor(message) {

        this._id = uuidv4();
        this._message = message;
        this._hasBeenRead = false;
    }

    get id() {

        return this._id;
    }

    get unread() {

        return !this._hasBeenRead;
    }

    get message() {
        this._hasBeenRead = true;

        return this._message;
    }

    toJson() {

        return {
            id: this.id,
            message: this.message
        };
    }

    toJsonString() {

        return JSON.stringify(this.toJson());
    }

}

module.exports = MailEntry;