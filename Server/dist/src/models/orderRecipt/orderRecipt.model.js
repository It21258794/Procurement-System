"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderRceiptSchema = new mongoose_1.default.Schema({
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
    paid_amount: {
        type: Number,
        required: true,
    },
    paid_date: {
        type: Date,
        required: true,
    },
}, { timestamps: true });
const OrderRceipt = mongoose_1.default.model('order', OrderRceiptSchema);
exports.default = OrderRceipt;
