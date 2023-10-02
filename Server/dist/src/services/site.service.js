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
const site_model_1 = __importDefault(require("../models/site/site.model"));
function insertSite(dto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sitemanager = yield account_model_1.default.findById({ _id: dto.sitemanagerid });
            if (!sitemanager) {
                throw new Error('Supplier does not exist');
            }
            const createdpayment = yield site_model_1.default.create(dto);
            return createdpayment;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.default = { insertSite };
