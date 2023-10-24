"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const express_1 = require("express");
const order_controller_1 = __importDefault(require("../controller/order.controller"));
const authGuard_1 = __importDefault(require("../utils/authGuard"));
exports.orderRoute = (0, express_1.Router)();
exports.orderRoute.post('/createOrder', order_controller_1.default.createOrder);
//get order per sites
exports.orderRoute.get('/getSiteOrder/:siteId', authGuard_1.default, order_controller_1.default.getOrderBySite);
//get site order by providing individual ids
exports.orderRoute.get('/getOrderById/:orderId', authGuard_1.default, order_controller_1.default.getOrderById);
exports.orderRoute.put('/setStatus', order_controller_1.default.changeStatus);
exports.orderRoute.get('/getOrderBudget/:orderId', authGuard_1.default, order_controller_1.default.getOrderAndBudget);
//delete a perticular order by providing id
exports.orderRoute.delete('/deleteOrder/:id', authGuard_1.default, order_controller_1.default.deleteOrderById);
//get get Orders By Month
exports.orderRoute.get('/getOrdersByMonth', order_controller_1.default.getOrders);
//get all orders supplier
exports.orderRoute.get('/getAllOrders', order_controller_1.default.getAllOrders);
