const { db } = require('./db');
const { etherApi } = require('./etherApi1'); // Import etherApi
const { rpcGetLatestData } = require('./rpcGetLatestData1');
const fs = require('fs');

const crawledBlocks = new Set();
const lastKnownBlockFile = 'last_known_block.txt';
const stopBlock = 11979490;
const intervalSeconds = 1; // Crawling interval in seconds

let latestBlock = 0;
let isCrawling = false;

const rpcCheckBlockNum = async () => {
    if (isCrawling) {
        return;
    }
    isCrawling = true;

    try {
        // Get the last known block crawled
        const lastKnownBlock = await getLastKnownBlock();

        // Call etherApi to get the latest block number
        const response = await etherApi.post('/', {
            "jsonrpc": "2.0",
            "method": "eth_blockNumber",
            "params": [],
            "id": 9
        });

        latestBlock = parseInt(response.data.result, 16); // Update the latestBlock variable

        // Start crawling from the next block after the last known block
        for (let i = lastKnownBlock + 1; i <= latestBlock; i++) {
            // If the block has not already been crawled, crawl it
            if (!crawledBlocks.has(i)) {
                // Check if the block data already exists in the database
                try {
                    const blockDataExists = await checkBlockDataExists(i);
                    if (!blockDataExists) {
                        // The block data does not exist in the database, so crawl and insert it
                        await crawlAndInsertBlock(i);
                    } else {
                        // The block data already existed in the database, so skip it
                        console.log(`Block data already existed for block ${i}`);
                    }
                } catch (err) {
                    console.error(`Error while checking/inserting block data: ${err.message}`);
                    // Handle the error or retry the operation
                }

                // Add the block number to the set of crawled blocks
                crawledBlocks.add(i);

                // Wait for the specified interval before crawling the next block
                await new Promise(resolve => setTimeout(resolve, intervalSeconds * 1000));

                // If the stop block is reached, stop crawling
                if (i === stopBlock) {
                    console.log('Reached stop block.');
                    saveLastKnownBlock(crawledBlocks);
                    return;
                }
            }
        }

        // Save the last known block
        saveLastKnownBlock(crawledBlocks);
    } finally {
        isCrawling = false;
    }
};

const getLastKnownBlock = async () => {
    try {
        const lastKnownBlock = await fs.promises.readFile(lastKnownBlockFile, 'utf8');
        return parseInt(lastKnownBlock, 10);
    } catch (err) {
        return 0;
    }
};

const saveLastKnownBlock = async (crawledBlocks) => {
    const lastKnownBlock = [...crawledBlocks].sort((a, b) => b - a)[0];
    await fs.promises.writeFile(lastKnownBlockFile, lastKnownBlock.toString(), 'utf8');
};

const checkBlockDataExists = async (blockNumber) => {
    return new Promise((resolve, reject) => {
        const txHashInsert = "SELECT IF(EXISTS(SELECT * from block_data WHERE blocknumber = ?), '1', '0' ) as RESULT";
        db.query(txHashInsert, [blockNumber], (err, result) => {
            if (err) {
                reject(err);
            } else {
                let string = JSON.stringify(result);
                let parse = JSON.parse(string);
                let checkBlockNum = parse[0].RESULT;
                resolve(checkBlockNum === '1');
            }
        });
    });
};

const crawlAndInsertBlock = async (blockNumber) => {
    return new Promise((resolve, reject) => {
        rpcGetLatestData(blockNumber, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

setInterval(() => saveLastKnownBlock(crawledBlocks), 30000);

module.exports = { rpcCheckBlockNum };
