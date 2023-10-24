"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var SiteSchema = new Schema({
    siteManager_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
    budget: {
        type: Number,
        require: true,
    },
}, { timestamps: true });
var Site = mongoose_1.default.model('Site', SiteSchema);
exports.default = Site;
