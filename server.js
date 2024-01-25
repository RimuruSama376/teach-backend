"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
//For env File 
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT || 8000;
app.get('/', function (req, res) {
    res.send('Welcome to Express & TypeScript Server');
});
app.listen(port, function () {
    console.log("Server is Fire at http://localhost:".concat(port));
});
