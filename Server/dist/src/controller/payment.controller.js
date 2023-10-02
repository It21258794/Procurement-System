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
const payment_service_1 = __importDefault(require("../services/payment.service"));
const insertPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("itemController");
        const dto = req.body;
        const item = yield payment_service_1.default.insertPayment(dto);
        res.status(200).json(item);
    }
    catch (err) {
        res.status(400).json({ err: err });
    }
});
const getbySupplierid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supplierid = req.params.supplierid;
        const payment = yield payment_service_1.default.getbySupplierid(supplierid);
        res.status(200).json(payment);
    }
    catch (err) {
        res.status(400).json({ err: err.message });
    }
});
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.paymentId;
        const updatedData = req.body;
        const updatedItem = yield payment_service_1.default.updatePayment(itemId, updatedData);
        res.status(200).json(updatedItem);
    }
    catch (err) {
        res.status(400).json({ err: err.message });
    }
});
exports.default = { insertPayment, updateItem, getbySupplierid };
