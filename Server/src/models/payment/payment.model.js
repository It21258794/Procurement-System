"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var PaymentSchema = new Schema({
    supplierId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        require: true,
    },
    accountNumber: {
        type: Number,
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
}, { timestamps: true });
var Payment = mongoose_1.default.model('Payment', PaymentSchema);
exports.default = Payment;
