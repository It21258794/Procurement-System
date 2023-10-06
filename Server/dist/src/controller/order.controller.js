"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_service_1 = __importDefault(require("../services/order.service"));
const sendOrder = (req, res) => {
    try {
        const { order_id, email } = req.body;
        console.log(order_id, email);
        order_service_1.default.sendOrderByEmail(order_id, email);
        res.status(401).send('Order Send via Email');
    }
    catch (err) {
        res.status(401).send({ err: err });
    }
};
exports.default = { sendOrder };
