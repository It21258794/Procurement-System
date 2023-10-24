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
exports.sum = void 0;
var account_model_1 = require("../models/account/account.model");
var auth_service_1 = require("../utils/auth.service");
var account_service_1 = require("../services/account.service");
var signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dto, newAcc, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                dto = req.body;
                return [4 /*yield*/, auth_service_1.default.register(dto)];
            case 1:
                newAcc = _a.sent();
                res.status(200).json(newAcc);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400).json({ err: err_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, response, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, auth_service_1.default.login(email, password)];
            case 1:
                response = _b.sent();
                res.status(200).json(response);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _b.sent();
                res.status(400).json({ err: err_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var findItemsByCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var catogory, accounts, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                catogory = req.params.catogory;
                return [4 /*yield*/, account_service_1.default.findAccountByCatogory(catogory)];
            case 1:
                accounts = _a.sent();
                res.status(200).json(accounts);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(400).json({ err: err_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var findItemsByUserName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userName, accounts, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userName = req.params.username;
                return [4 /*yield*/, account_service_1.default.findItemsByUserName(userName)];
            case 1:
                accounts = _a.sent();
                res.status(200).json(accounts);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(400).json({ err: err_4.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accountId, updatedData, updatedAccount, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                accountId = req.params.accountid;
                updatedData = req.body;
                return [4 /*yield*/, account_service_1.default.updateAccount(accountId, updatedData)];
            case 1:
                updatedAccount = _a.sent();
                console.log(updatedAccount);
                res.status(200).json(updatedAccount);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(400).json({ err: err_5.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var deleteAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accountId, isDeleted, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                accountId = req.params.accountid;
                return [4 /*yield*/, account_service_1.default.deleteAccount(accountId)];
            case 1:
                isDeleted = _a.sent();
                if (isDeleted) {
                    res.status(200).json({ message: 'Account deleted successfully' });
                }
                else {
                    res.status(404).json({ message: 'Account is not found' });
                }
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                res.status(400).json({ err: err_6.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getCurrentUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.currentUser.id;
                return [4 /*yield*/, account_model_1.default.findById(userId)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.status(200).json({ user: user })];
            case 2:
                err_7 = _a.sent();
                throw err_7;
            case 3: return [2 /*return*/];
        }
    });
}); };
var getSupllierEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var supplierId, user, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                supplierId = req.params.supplierId;
                return [4 /*yield*/, account_model_1.default.findById(supplierId)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.status(200).json({ email: user === null || user === void 0 ? void 0 : user.email })];
            case 2:
                err_8 = _a.sent();
                throw err_8;
            case 3: return [2 /*return*/];
        }
    });
}); };
var sum = function (a, b) { return a + b; };
exports.sum = sum;
exports.default = {
    signUp: signUp,
    login: login,
    findItemsByCategory: findItemsByCategory,
    findItemsByUserName: findItemsByUserName,
    updateAccount: updateAccount,
    deleteAccount: deleteAccount,
    getCurrentUser: getCurrentUser,
    getSupllierEmail: getSupllierEmail
};
