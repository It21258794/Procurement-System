"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const SiteSchema = new Schema({
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
});
const Site = mongoose_1.default.model('Site', SiteSchema);
exports.default = Site;
