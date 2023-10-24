"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var cartSchema = new mongoose_1.default.Schema({
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
    description: {
        type: String,
        required: false,
    },
});
var order = mongoose_1.default.model('cart', cartSchema);
exports.default = order;
