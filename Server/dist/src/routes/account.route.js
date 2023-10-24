"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRoute = void 0;
const express_1 = require("express");
const account_controller_1 = __importDefault(require("../controller/account.controller"));
const authGuard_1 = __importDefault(require("../utils/authGuard"));
exports.accountRoute = (0, express_1.Router)();
exports.accountRoute.post('/createAccount', account_controller_1.default.signUp);
exports.accountRoute.post('/login', account_controller_1.default.login);
exports.accountRoute.get('/findAccountByCategory/:catogory', account_controller_1.default.findItemsByCategory);
exports.accountRoute.get('/findAccountByUserName/:username', account_controller_1.default.findItemsByUserName);
exports.accountRoute.get('/currentUser', authGuard_1.default, account_controller_1.default.getCurrentUser);
exports.accountRoute.put('/updateAccount/:accountid', account_controller_1.default.updateAccount);
exports.accountRoute.delete('/deleteAccount/:accountid', account_controller_1.default.deleteAccount);
exports.accountRoute.get('/supplierEmail/:supplierId', account_controller_1.default.getSupllierEmail);
exports.accountRoute.get('/getAccountTypes', account_controller_1.default.getAccountTypes);
