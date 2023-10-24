"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var AccountSchema = new Schema({
    fname: {
        type: String,
        require: true,
    },
    lname: {
        type: String,
        require: true,
    },
    mobile: {
        type: Number,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: true,
    },
    profileImage: {
        type: String, // Store the path to the image file on your server
    },
}, { timestamps: true });
var Account = mongoose_1.default.model('Account', AccountSchema);
exports.default = Account;
