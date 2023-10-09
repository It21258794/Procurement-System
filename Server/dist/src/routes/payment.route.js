"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoute = void 0;
const express_1 = require("express");
const payment_controller_1 = __importDefault(require("../controller/payment.controller"));
exports.paymentRoute = (0, express_1.Router)();
// Route needed
exports.paymentRoute.post('/insertPayment', payment_controller_1.default.insertPayment);
exports.paymentRoute.get('/getPaymentBySupplierId/:supplierId', payment_controller_1.default.getPayemtDetails);
exports.paymentRoute.post('/createPaymentItem', payment_controller_1.default.createPaymentItem);
