"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const express_1 = require("express");
const order_controller_1 = __importDefault(require("../controller/order.controller"));
exports.orderRoute = (0, express_1.Router)();
exports.orderRoute.post('/createOrder', order_controller_1.default.createOrder);
