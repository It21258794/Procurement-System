"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var OrderRceiptSchema = new mongoose_1.default.Schema({
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
var OrderRceipt = mongoose_1.default.model('order', OrderRceiptSchema);
exports.default = OrderRceipt;
