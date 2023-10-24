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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_service_1 = require("../services/order.service");
var order_model_1 = require("../models/order/order.model");
var sendOrder = function (req, res) {
    try {
        var _a = req.body, order_id = _a.order_id, email = _a.email, pdf = _a.pdf;
        console.log(order_id, email);
        order_service_1.default.sendOrderByEmail(order_id, email, pdf);
        res.status(401).send('Order Send via Email');
    }
    catch (err) {
        res.status(401).send({ err: err });
    }
};
var createOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var getOrderId, orderDetails, order, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, order_service_1.default.getOrderId()];
            case 1:
                getOrderId = _a.sent();
                req.body.orderId = getOrderId;
                orderDetails = new order_model_1.default(req.body);
                return [4 /*yield*/, order_service_1.default.createOrder(orderDetails)];
            case 2:
                order = _a.sent();
                res.status(200).json(order);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(401).send({ err: err_1 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getOrderBySite = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var siteId, order, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                siteId = req.params.siteId;
                return [4 /*yield*/, order_service_1.default.getOrderBySite(siteId)];
            case 1:
                order = _a.sent();
                res.status(200).json(order);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(401).send({ err: err_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getOrderById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, foundOrder, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log('here');
                orderId = req.params.orderId;
                return [4 /*yield*/, order_service_1.default.getOrderById(orderId)];
            case 1:
                foundOrder = _a.sent();
                res.status(200).json(foundOrder);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(401).send({ err: err_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var changeStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, orderId, status_1, item, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, orderId = _a.orderId, status_1 = _a.status;
                return [4 /*yield*/, order_service_1.default.changeOrderStatus(orderId, status_1)];
            case 1:
                item = _b.sent();
                res.status(200).json(item);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _b.sent();
                res.status(401).send({ err: err_4 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getOrderAndBudget = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, _a, orderItem, budget, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                orderId = req.params.orderId;
                return [4 /*yield*/, order_service_1.default.getOrderAndBudget(orderId)];
            case 1:
                _a = _b.sent(), orderItem = _a.orderItem, budget = _a.budget;
                res.status(200).json({ orderItem: orderItem, budget: budget });
                return [3 /*break*/, 3];
            case 2:
                err_5 = _b.sent();
                res.status(401).send({ err: err_5 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var deleteOrderById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedItem, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, order_service_1.default.deleteOrder(id)];
            case 1:
                deletedItem = _a.sent();
                res.status(200).json({ deletedItem: deletedItem });
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                res.status(401).send({ err: err_6 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fountItem, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order_service_1.default.getOrderByMonth()];
            case 1:
                fountItem = _a.sent();
                res.status(200).json({ fountItem: fountItem });
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                res.status(401).send({ err: err_7 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
//get all orders
var getAllOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderRequests, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order_service_1.default.getAllOrders()];
            case 1:
                orderRequests = _a.sent();
                if (orderRequests && orderRequests.length > 0) {
                    res.status(200).json({ orderRequests: orderRequests });
                }
                else {
                    res.status(404).json({ message: 'No order found' });
                }
                return [3 /*break*/, 3];
            case 2:
                err_8 = _a.sent();
                res.status(400).json({ err: err_8.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    getAllOrders: getAllOrders,
    sendOrder: sendOrder,
    createOrder: createOrder,
    getOrderBySite: getOrderBySite,
    getOrderById: getOrderById,
    changeStatus: changeStatus,
    getOrderAndBudget: getOrderAndBudget,
    deleteOrderById: deleteOrderById,
    getOrders: getOrders,
};
