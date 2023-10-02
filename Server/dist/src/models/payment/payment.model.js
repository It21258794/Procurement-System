"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const PaymentSchema = new Schema({
    supplierid: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        require: true,
    },
    procumentStaffid: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        require: false,
    },
    amount: {
        type: Number,
        require: true,
    },
});
const Payment = mongoose_1.default.model('Payment', PaymentSchema);
exports.default = Payment;
