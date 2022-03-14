const crypto = require('crypto');

class Block {
    constructor(data, prevHash = "") {
        this.timestamp = Date.now();
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.computeHash();
    }

    computeHash() {
        const strBlock = JSON.stringify({
            prevHash: this.prevHash,
            timestamp: this.timestamp,
            data: this.data
        });

        return crypto.createHash("sha256")
            .update(strBlock)
            .digest("hex");
    }

    toJsonString() {

        return JSON.stringify({
            hash: this.hash,
            prevHash: this.prevHash,
            timestamp: this.timestamp,
            data: this.data
        });
    }
}

module.exports = Block;