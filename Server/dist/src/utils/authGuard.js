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
const auth_service_1 = __importDefault(require("./auth.service"));
const AuthGuard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authToken = req.headers['authorization'];
    if (!authToken) {
        return res.status(400).send({
            err: 'Forbinded Resources1',
        });
    }
    try {
        console.log(authToken.split('Bearer ')[1]);
        const payload = yield auth_service_1.default.verifyToken(authToken.split('Bearer ')[1]);
        req.currentUser = payload;
        next();
    }
    catch (err) {
        return res.status(400).send({
            err: 'Forbinded Resources2',
        });
    }
});
exports.default = AuthGuard;
