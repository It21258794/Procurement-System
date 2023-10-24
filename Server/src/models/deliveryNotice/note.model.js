"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var noteSchema = new mongoose_1.default.Schema({
    orderId: {
        type: String,
        ref: 'order',
        required: true,
    },
    // address: {
    //   type: String,
    //   required: true,
    // },
    // requiredDate: {
    //   type: Date,
    //   required: true,
    // },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: false });
var note = mongoose_1.default.model('note', noteSchema);
exports.default = note;
