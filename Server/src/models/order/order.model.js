"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var OrderStatus_1 = require("./OrderStatus");
var orderSchema = new mongoose_1.default.Schema({
    orderId: {
        type: String,
        required: true,
    },
    siteId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
    supplierId: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    month_year: {
        type: String,
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
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    total_cost: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: OrderStatus_1.OrderStatus.PENDING,
    },
    description: {
        type: String,
        required: false,
    },
}, { timestamps: true });
var order = mongoose_1.default.model('order', orderSchema);
exports.default = order;
