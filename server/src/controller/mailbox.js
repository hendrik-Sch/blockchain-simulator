const MailEntry = require("./mailEntry");

class Mailbox {
    constructor(role) {
        this.storage = new Array();
        this._role = role;
    }

    get unreadMails() {

        return this.storage.filter(mail => mail.unread).length;
    }

    newMail(message) {
        const newEntry = new MailEntry(message);

        this.storage.push(newEntry);
    }

    readMails() {

        return this.storage
            .map(entry => entry.toJson())
            .reverse();
    }
}

module.exports = Mailbox;