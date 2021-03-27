"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = express_1.Router();
// for testing up status of API
exports.router.get('/', (req, res) => {
    res.status(200).json({ message: 'API is active.' });
});
