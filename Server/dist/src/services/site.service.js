"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const account_model_1 = __importDefault(require("../models/account/account.model"));
const budgetForm_1 = __importDefault(require("../models/budgetForm/budgetForm"));
const site_model_1 = __importDefault(require("../models/site/site.model"));
function insertSite(dto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sitemanager = yield account_model_1.default.findById({ _id: dto.siteManager_id });
            if (!sitemanager) {
                throw new Error('Supplier does not exist');
            }
            const createdSite = yield site_model_1.default.create(dto);
            return createdSite;
        }
        catch (err) {
            throw err;
        }
    });
}
const getSite = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const site = yield site_model_1.default.find();
        return site;
    }
    catch (err) {
        throw err;
    }
});
const Increasebugest = (dto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const site = yield site_model_1.default.findById(dto.site_id);
        if (!site) {
            throw 'Site not found';
        }
        const budgetItem = yield budgetForm_1.default.create(dto);
        return budgetItem;
    }
    catch (err) {
        throw err;
    }
});
//http://localhost:8000/api/site/approveBudget
function approveBudget(site_id, budget_id, status, budget) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updateBudget = yield budgetForm_1.default.updateOne({ _id: budget_id }, { status: status });
            console.log(updateBudget);
            if (!updateBudget) {
                throw 'budget not updated.';
            }
            yield site_model_1.default.updateOne({ _id: site_id }, { budget: budget });
            return true;
        }
        catch (err) {
            throw err;
        }
    });
}
//http://localhost:8000/api/site/getAllApprovedOrders
function getAllApprovedBudget() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const approvedBudget = yield budgetForm_1.default.find({ status: 'confirmed' });
            return approvedBudget;
        }
        catch (err) {
            throw err;
        }
    });
}
//http://localhost:8000/api/site/rejectOrder
function rejectBudget(site_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rejectBudget = yield budgetForm_1.default.findByIdAndUpdate(site_id, { status: 'rejected' });
            if (!rejectBudget) {
                throw new Error('budget not found');
            }
            return true;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.default = { insertSite, getSite, Increasebugest, rejectBudget, approveBudget, getAllApprovedBudget };
