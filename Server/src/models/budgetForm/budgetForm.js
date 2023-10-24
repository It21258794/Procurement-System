"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var IBudget_1 = require("./IBudget");
var Schema = mongoose_1.default.Schema;
var BudgetFormSchema = new Schema({
    site_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        require: true,
    },
    curr_budget: {
        type: Number,
        require: true,
    },
    amount: {
        type: Number,
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        default: IBudget_1.BudgetStatus.PENDING,
    },
}, { timestamps: true });
var BudgetForm = mongoose_1.default.model('BudgetForm', BudgetFormSchema);
exports.default = BudgetForm;
