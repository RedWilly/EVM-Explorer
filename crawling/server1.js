const express = require("express");
const app = express();
const port = 3007;
const { rpcCheckBlockNum } = require('./rpcCheckBlockNum1');
//const { rpcRecheckBlockNum } = require('./rpcRecheckBlockNum1');
require('dotenv').config();

const intervalSeconds = 3; // Set the crawling interval to 3 seconds

// forever
setInterval(() => rpcCheckBlockNum(), intervalSeconds * 1000); // Checking next block every 3 seconds
//setInterval(() => rpcRecheckBlockNum(), 60000); // Checking 30 previous block data every minute

app.get("/", (req, res) => {
    res.json("crawling server");
});

app.listen(port, () => {
    console.log(`Example app listening at ${port}`);
});
