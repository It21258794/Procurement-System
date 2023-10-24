"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var account_model_1 = require("../models/account/account.model");
function createPasswordHash(password) {
    return bcrypt_1.default.hash(password, 10);
}
function validatePassword(password, hash) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt_1.default.compare(password, hash)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getToken(password, hash, payload) {
    return __awaiter(this, void 0, void 0, function () {
        var isValidPassword, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(payload);
                    return [4 /*yield*/, validatePassword(password, hash)];
                case 1:
                    isValidPassword = _a.sent();
                    if (!isValidPassword) {
                        throw new Error('Invalid Password');
                    }
                    try {
                        console.log('kkkk');
                        token = jsonwebtoken_1.default.sign(payload, process.env.APP_SECRET, {
                            expiresIn: process.env.APP_ACCESS_TOKEN_EXP_SECS,
                        });
                        console.log(token);
                        return [2 /*return*/, {
                                token: token,
                                life: process.env.APP_ACCESS_TOKEN_EXP_SECS,
                            }];
                    }
                    catch (err) {
                        throw err;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function verifyToken(token) {
    return __awaiter(this, void 0, void 0, function () {
        var payload, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log('token', token);
                    return [4 /*yield*/, jsonwebtoken_1.default.decode(token)];
                case 1:
                    payload = _a.sent();
                    console.log(payload);
                    return [2 /*return*/, payload];
                case 2:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function login(email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var acc, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, account_model_1.default.findOne({ email: email })];
                case 1:
                    acc = _a.sent();
                    if (!acc) {
                        throw new Error('Account Not Found');
                    }
                    console.log(email, password);
                    return [4 /*yield*/, getToken(password, acc.password, {
                            id: acc._id.toString(),
                            email: acc.email,
                            role: acc.role,
                        })];
                case 2:
                    token = _a.sent();
                    return [2 /*return*/, token];
            }
        });
    });
}
function register(dto) {
    return __awaiter(this, void 0, void 0, function () {
        var existUser, pass_hash, cpyUser, newUser, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, account_model_1.default.findOne({ email: dto.email })];
                case 1:
                    existUser = _a.sent();
                    console.log(dto);
                    if (existUser) {
                        throw 'Account already exist for this email address';
                    }
                    return [4 /*yield*/, createPasswordHash(dto.password)];
                case 2:
                    pass_hash = _a.sent();
                    console.log(pass_hash);
                    cpyUser = __assign({}, dto);
                    cpyUser.password = pass_hash;
                    return [4 /*yield*/, account_model_1.default.create(cpyUser)];
                case 3:
                    newUser = _a.sent();
                    return [2 /*return*/, newUser];
                case 4:
                    err_2 = _a.sent();
                    throw err_2;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.default = { createPasswordHash: createPasswordHash, register: register, login: login, verifyToken: verifyToken };
