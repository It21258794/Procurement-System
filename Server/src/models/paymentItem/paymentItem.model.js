"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var PaymentItemSchema = new Schema({
    order_id: {
        type: String,
        require: true,
    },
    accountNumber: {
        type: String,
        require: true,
    },
    accountHolderName: {
        type: String,
        require: true,
    },
    bankName: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
}, { timestamps: true });
var PaymentItem = mongoose_1.default.model('PaymentItem', PaymentItemSchema);
exports.default = PaymentItem;
