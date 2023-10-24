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
// import createTemplate from '../../../Client/src/components/procurementManager/payment/receipt-template'
const order_service_1 = __importDefault(require("../services/order.service"));
// Function to insert a new payment
const insertPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('itemController');
        const dto = req.body;
        const item = yield payment_service_1.default.insertPayment(dto);
        res.status(200).json(item);
    }
    catch (err) {
        res.status(400).json({ err: err });
    }
});
const getPayemtDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { supplierId } = req.params;
        const item = yield payment_service_1.default.getPayemtDetailsBySupplier(supplierId);
        res.status(200).json(item);
    }
    catch (err) {
        res.status(400).json({ err: err });
    }
});
const createPaymentItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dto = req.body;
        console.log(dto);
        const paymentItem = yield payment_service_1.default.createPayment(dto);
        res.status(200).json(paymentItem);
    }
    catch (err) {
        res.status(400).json({ err: err });
    }
});
// const createReceipt = async (req:Request, res: Response) => {
//   // Calling the template render func with dynamic data
//   const result = await createTemplate(req.body);
// };
const sendReceipt = (req, res) => {
    try {
        const { order_id, email, pdf } = req.body;
        order_service_1.default.sendOrderByEmail(order_id, email, pdf);
        res.status(401).send('Order Send via Email');
    }
    catch (err) {
        res.status(401).send({ err: err });
    }
};
exports.default = { insertPayment, getPayemtDetails, createPaymentItem, sendReceipt };
