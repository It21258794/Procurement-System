"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const PaymentSchema = new Schema({
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
const Payment = mongoose_1.default.model('Payment', PaymentSchema);
exports.default = Payment;
