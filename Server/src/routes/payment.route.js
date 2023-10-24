"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoute = void 0;
var express_1 = require("express");
var payment_controller_1 = require("../controller/payment.controller");
var authGuard_1 = require("../utils/authGuard");
exports.paymentRoute = (0, express_1.Router)();
// Route needed
exports.paymentRoute.post('/insertPayment', payment_controller_1.default.insertPayment);
exports.paymentRoute.get('/getPaymentBySupplierId/:supplierId', payment_controller_1.default.getPayemtDetails);
exports.paymentRoute.post('/createPaymentItem', authGuard_1.default, payment_controller_1.default.createPaymentItem);
exports.paymentRoute.post('/sendPaymentReceipt', authGuard_1.default, payment_controller_1.default.sendReceipt);
