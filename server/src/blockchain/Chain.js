const Block = require('./Block');

// const OK_PROBABILITY = 0.8;
// const NOT_OK_TEMP = 21;
const MAX_OK_TEMP = 7;
const MIN_OK_TEMP = -2;

const GenerateRandomTemp = () => {
    // if (Math.random() >= OK_PROBABILITY) {

    //     return NOT_OK_TEMP;
    // }

    const min = Math.ceil(MIN_OK_TEMP);
    const max = Math.floor(MAX_OK_TEMP);

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

class BlockChain {
    constructor() {
        this.storage = new Array();

        const genesisBlock = this.startGenesisBlock();
        this.storage[0] = genesisBlock;
    }

    startGenesisBlock() {

        return new Block({
            id: 0,
            message: "Blockchain gestartet"
        });
    }

    getLatestBlock() {
        const lastIndex = this.storage.length - 1;

        return this.storage[lastIndex];
    }

    addNewBlock(newBlock) {
        const { hash } = this.getLatestBlock();

        newBlock.prevHash = hash;
        newBlock.data.temperature = GenerateRandomTemp();
        newBlock.hash = newBlock.computeHash();

        this.storage.push(newBlock);
    }

    checkChainValidity() {
        for (let i = 1; i < this.storage.length; i++) {
            const currBlock = this.storage[i];
            const prevBlock = this.storage[i - 1];

            if (currBlock.hash !== currBlock.computeHash()) {

                return false;
            }

            if (currBlock.prevHash !== prevBlock.hash) {

                return false;
            }

        }

        return true;
    }

    toJsonString() {

        return this.storage.map(block => block.toJsonString());
    }
}

module.exports = BlockChain;