"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    orderId: {
        type: String,
        require: true,
    },
    supplierId: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    requiredDate: {
        type: Date,
        require: true,
    },
    quantity: {
        type: Date,
        require: true,
    },
    description: {
        type: Date,
        require: false,
    },
});
const order = mongoose_1.default.model('order', orderSchema);
exports.default = order;
