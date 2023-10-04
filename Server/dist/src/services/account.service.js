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
function findAccountByCatogory(catogory) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Searching for accounts with the role:', catogory);
            const accounts = yield account_model_1.default.find({ role: catogory });
            console.log('Found items:', accounts);
            return accounts;
        }
        catch (err) {
            throw err;
        }
    });
}
function findItemsByUserName(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Searching for accounts with the username:', username);
            const { firstName, lastName } = splitFullName(username);
            const accounts = yield account_model_1.default.find({ fname: firstName, lname: lastName });
            console.log('Found items:', accounts);
            return accounts;
        }
        catch (err) {
            throw err;
        }
    });
}
function updateAccount(accountId, updatedData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(accountId);
            console.log(updatedData);
            const updatedItem = yield account_model_1.default.findByIdAndUpdate(accountId, updatedData, { new: true });
            console.log(updatedItem);
            if (!updatedItem) {
                throw new Error('Account not found');
            }
            return updatedItem;
        }
        catch (err) {
            throw err;
        }
    });
}
function deleteAccount(userid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedaccount = yield account_model_1.default.findByIdAndDelete(userid);
            if (!deletedaccount) {
                throw new Error('Item not found');
            }
            return true;
        }
        catch (err) {
            throw err;
        }
    });
}
//Splits a full name into its constituent first name and last name.
function splitFullName(fullName) {
    const parts = fullName.split(' ');
    if (parts.length === 2) {
        const [firstName, lastName] = parts;
        return { firstName, lastName };
    }
    else {
        throw new Error('Invalid full name format');
    }
}
exports.default = { findAccountByCatogory, findItemsByUserName, deleteAccount, updateAccount };
