"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ItemSchema = new Schema({
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
    price: {
        type: Number,
        require: true,
    },
});
const Item = mongoose_1.default.model('Item', ItemSchema);
exports.default = Item;
