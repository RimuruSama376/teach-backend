"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const dbConnect = async () => {
    mongoose
        .connect(process.env.DB_URL)
        .then(() => {
        console.log('Successfully connected to MongoDB');
    })
        .catch((err) => {
        console.log('Unable to connect to MongoDb: ', err);
    });
};
module.exports = dbConnect;
