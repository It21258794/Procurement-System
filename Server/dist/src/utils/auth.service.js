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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const account_model_1 = __importDefault(require("../models/account/account.model"));
function createPasswordHash(password) {
    return bcrypt_1.default.hash(password, 10);
}
function validatePassword(password, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, hash);
    });
}
function getToken(password, hash, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(payload);
        const isValidPassword = yield validatePassword(password, hash);
        if (!isValidPassword) {
            throw new Error('Invalid Password');
        }
        try {
            console.log('kkkk');
            const token = jsonwebtoken_1.default.sign(payload, process.env.APP_SECRET, {
                expiresIn: process.env.APP_ACCESS_TOKEN_EXP_SECS,
            });
            console.log(token);
            return {
                token,
                life: process.env.APP_ACCESS_TOKEN_EXP_SECS,
            };
        }
        catch (err) {
            throw err;
        }
    });
}
function verifyToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('token', token);
            const payload = yield jsonwebtoken_1.default.decode(token);
            console.log(payload);
            return payload;
        }
        catch (err) {
            console.log(err);
        }
    });
}
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const acc = yield account_model_1.default.findOne({ email: email });
        if (!acc) {
            throw new Error('Account Not Found');
        }
        console.log(email, password);
        const token = yield getToken(password, acc.password, {
            id: acc._id.toString(),
            email: acc.email,
            role: acc.role,
        });
        return token;
    });
}
function register(dto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existUser = yield account_model_1.default.findOne({ email: dto.email });
            console.log(dto);
            if (existUser) {
                throw 'Account already exist for this email address';
            }
            const pass_hash = yield createPasswordHash(dto.password);
            console.log(pass_hash);
            let cpyUser = Object.assign({}, dto);
            cpyUser.password = pass_hash;
            const newUser = yield account_model_1.default.create(cpyUser);
            return newUser;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.default = { createPasswordHash, register, login, verifyToken };
