const { rpcCheckBlockNum } = require('./rpcCheckBlockNum');

const crawlBlock = async () => {
    let blockNumber = 0;
    while (true) {
        await rpcCheckBlockNum(blockNumber);
        blockNumber++;
        if (blockNumber === 11979121) {
            // Stop crawling at block 15599958, the last block mined before the Merge.
            break;
        }
    }
};

module.exports = { crawlBlock };
