"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    orderId: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    requiredDate: {
        type: Date,
        required: true,
    },
    items: [
        {
            itemName: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: false,
            },
            quantity: {
                type: Number,
                required: true,
            },
            supplierId: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    description: {
        type: Date,
        required: false,
    },
});
const order = mongoose_1.default.model('order', orderSchema);
exports.default = order;
