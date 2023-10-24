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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var account_model_1 = require("../models/account/account.model");
var budgetForm_1 = require("../models/budgetForm/budgetForm");
var site_model_1 = require("../models/site/site.model");
function insertSite(dto) {
    return __awaiter(this, void 0, void 0, function () {
        var sitemanager, createdSite, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, account_model_1.default.findById({ _id: dto.siteManager_id })];
                case 1:
                    sitemanager = _a.sent();
                    if (!sitemanager) {
                        throw new Error('Supplier does not exist');
                    }
                    return [4 /*yield*/, site_model_1.default.create(dto)];
                case 2:
                    createdSite = _a.sent();
                    return [2 /*return*/, createdSite];
                case 3:
                    err_1 = _a.sent();
                    throw err_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
var getSite = function () { return __awaiter(void 0, void 0, void 0, function () {
    var site, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, site_model_1.default.find()];
            case 1:
                site = _a.sent();
                return [2 /*return*/, site];
            case 2:
                err_2 = _a.sent();
                throw err_2;
            case 3: return [2 /*return*/];
        }
    });
}); };
var Increasebugest = function (dto) { return __awaiter(void 0, void 0, void 0, function () {
    var site, budgetItem, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                console.log('service', dto);
                return [4 /*yield*/, site_model_1.default.findById(dto.site_id)];
            case 1:
                site = _a.sent();
                if (!site) {
                    throw 'Site not found';
                }
                return [4 /*yield*/, budgetForm_1.default.create(dto)];
            case 2:
                budgetItem = _a.sent();
                return [2 /*return*/, budgetItem];
            case 3:
                err_3 = _a.sent();
                throw err_3;
            case 4: return [2 /*return*/];
        }
    });
}); };
//http://localhost:8000/api/site/approveBudget
function approveBudget(site_id, budget_id, status, budget) {
    return __awaiter(this, void 0, void 0, function () {
        var updateBudget, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, budgetForm_1.default.updateOne({ _id: budget_id }, { status: status })];
                case 1:
                    updateBudget = _a.sent();
                    console.log(updateBudget);
                    if (!updateBudget) {
                        throw 'budget not updated.';
                    }
                    return [4 /*yield*/, site_model_1.default.updateOne({ _id: site_id }, { budget: budget })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3:
                    err_4 = _a.sent();
                    throw err_4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
// http://localhost:8000/api/site/getAllBudgetRequests
function getAllBudgetRequests() {
    return __awaiter(this, void 0, void 0, function () {
        var budgetRequests, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, budgetForm_1.default.find({ status: 'pending' })];
                case 1:
                    budgetRequests = _a.sent();
                    return [2 /*return*/, budgetRequests];
                case 2:
                    err_5 = _a.sent();
                    throw err_5;
                case 3: return [2 /*return*/];
            }
        });
    });
}
//http://localhost:8000/api/site/getAllApprovedOrders
function getAllApprovedBudget() {
    return __awaiter(this, void 0, void 0, function () {
        var approvedBudget, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, budgetForm_1.default.find({ status: 'confirmed' })];
                case 1:
                    approvedBudget = _a.sent();
                    return [2 /*return*/, approvedBudget];
                case 2:
                    err_6 = _a.sent();
                    throw err_6;
                case 3: return [2 /*return*/];
            }
        });
    });
}
//http://localhost:8000/api/site/rejectOrder
function rejectBudget(site_id) {
    return __awaiter(this, void 0, void 0, function () {
        var deletedBudget, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, budgetForm_1.default.findByIdAndDelete(site_id)];
                case 1:
                    deletedBudget = _a.sent();
                    if (!deletedBudget) {
                        throw new Error('Budget request not found');
                    }
                    return [2 /*return*/, true];
                case 2:
                    err_7 = _a.sent();
                    throw err_7;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    insertSite: insertSite,
    getSite: getSite,
    Increasebugest: Increasebugest,
    rejectBudget: rejectBudget,
    approveBudget: approveBudget,
    getAllApprovedBudget: getAllApprovedBudget,
    getAllBudgetRequests: getAllBudgetRequests,
};
