const express = require('express');
const dotenv = require('dotenv');
const {dispatcher} = require("./dispatcher.js");
const path = require('path');
const Redis = require("ioredis");

dotenv.config();

global.basePath = path.resolve(__dirname);

const app = express();

const port = process.env.PORT || 3000;

const redisClient = new Redis(process.env.REDIS_URL);

(async () => {
    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    redisClient.on("connect", () => console.log("Redis client connected"));

    await redisClient.subscribe('newJob');

    await redisClient.on('message', (channel, message,) => {
        console.log({
            message: "New Job Received",
        });

        dispatcher('jobHandler.js', {
            jobs: [JSON.parse(message)]
        })
    })
})()

app.get('/', (req, res) => {
    res.json({
        message: "Hello World"
    })
})

app.listen(port, () => {
    console.log('Server is running on port 3000');
})