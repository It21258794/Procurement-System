"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var ItemSchema = new Schema({
    itemName: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: false,
    },
    img: {
        type: String,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    },
    supplierId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        require: true,
    },
    supplierUsername: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
}, { timestamps: true });
var Item = mongoose_1.default.model('Item', ItemSchema);
exports.default = Item;
