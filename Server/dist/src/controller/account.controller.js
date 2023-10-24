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
exports.sum = void 0;
const account_model_1 = __importDefault(require("../models/account/account.model"));
const auth_service_1 = __importDefault(require("../utils/auth.service"));
const account_service_1 = __importDefault(require("../services/account.service"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dto = req.body;
        const newAcc = yield auth_service_1.default.register(dto);
        res.status(200).json(newAcc);
    }
    catch (err) {
        res.status(400).json({ err: err });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const response = yield auth_service_1.default.login(email, password);
        res.status(200).json(response);
    }
    catch (err) {
        res.status(400).json({ err: err });
    }
});
const findItemsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const catogory = req.params.catogory;
        const accounts = yield account_service_1.default.findAccountByCatogory(catogory);
        res.status(200).json(accounts);
    }
    catch (err) {
        res.status(400).json({ err: err.message });
    }
});
const findItemsByUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userName = req.params.username;
        const accounts = yield account_service_1.default.findItemsByUserName(userName);
        res.status(200).json(accounts);
    }
    catch (err) {
        res.status(400).json({ err: err.message });
    }
});
const updateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountId = req.params.accountid;
        const updatedData = req.body;
        const updatedAccount = yield account_service_1.default.updateAccount(accountId, updatedData);
        console.log(updatedAccount);
        res.status(200).json(updatedAccount);
    }
    catch (err) {
        res.status(400).json({ err: err.message });
    }
});
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountId = req.params.accountid;
        const isDeleted = yield account_service_1.default.deleteAccount(accountId);
        if (isDeleted) {
            res.status(200).json({ message: 'Account deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Account is not found' });
        }
    }
    catch (err) {
        res.status(400).json({ err: err.message });
    }
});
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.currentUser.id;
        const user = yield account_model_1.default.findById(userId);
        return res.status(200).json({ user: user });
    }
    catch (err) {
        throw err;
    }
});
const getSupllierEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { supplierId } = req.params;
        const user = yield account_model_1.default.findById(supplierId);
        return res.status(200).json({ email: user === null || user === void 0 ? void 0 : user.email });
    }
    catch (err) {
        throw err;
    }
});
const sum = (a, b) => a + b;
exports.sum = sum;
exports.default = {
    signUp,
    login,
    findItemsByCategory,
    findItemsByUserName,
    updateAccount,
    deleteAccount,
    getCurrentUser,
    getSupllierEmail
};
