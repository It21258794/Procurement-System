"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_service_1 = __importDefault(require("../services/order.service"));
const order_model_1 = __importDefault(require("../models/order/order.model"));
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
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getOrderId = yield order_service_1.default.getOrderId();
        req.body.orderId = getOrderId;
        const orderDetails = new order_model_1.default(req.body);
        const order = yield order_service_1.default.createOrder(orderDetails);
        res.status(200).json(order);
    }
    catch (err) {
        res.status(401).send({ err: err });
    }
});
const budgetApprove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.orderId;
        const isApproved = yield order_service_1.default.approveOrder(orderId);
        if (isApproved) {
            res.status(200).json({ message: 'Order approved successfully' });
        }
        else {
            res.status(404).json({ message: 'Order not found' });
        }
    }
    catch (err) {
        res.status(400).json({ err: err.message });
    }
});
const getAllApprovedOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const approvedOrders = yield order_service_1.default.getAllApprovedOrders();
        if (approvedOrders && approvedOrders.length > 0) {
            res.status(200).json({ approvedOrders });
        }
        else {
            res.status(404).json({ message: 'No approved orders found' });
        }
    }
    catch (err) {
        res.status(400).json({ err: err.message });
    }
});
const budgetReject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.orderId;
        const isRejected = yield order_service_1.default.rejectOrder(orderId);
        if (isRejected) {
            res.status(200).json({ message: 'Order rejected successfully' });
        }
        else {
            res.status(404).json({ message: 'Order not found' });
        }
    }
    catch (err) {
        res.status(400).json({ err: err });
    }
});
const getOrderBySite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { siteId } = req.params;
        const order = yield order_service_1.default.getOrderBySite(siteId);
        res.status(200).json(order);
    }
    catch (err) {
        res.status(401).send({ err: err });
    }
});
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const foundOrder = yield order_service_1.default.getOrderById(orderId);
        res.status(200).json(foundOrder);
    }
    catch (err) {
        res.status(401).send({ err: err });
    }
});
exports.default = { sendOrder, createOrder, budgetReject, budgetApprove, getAllApprovedOrders, getOrderBySite, getOrderById };
