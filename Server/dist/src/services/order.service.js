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
const nodemailer_1 = __importDefault(require("nodemailer"));
const order_model_1 = __importDefault(require("../models/order/order.model"));
const sendOrderByEmail = (order_id, email) => {
    try {
        console.log(process.env.EMAIL_PASS);
        let transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });
        let mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: `Order No :${order_id}`,
            text: 'You have recied an Order From Codex Cunstruction Company',
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent : ', info.response);
            }
        });
    }
    catch (err) {
        console.log(err);
    }
};
function createOrder(orderDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newOrder = yield orderDetails.save();
            return newOrder;
        }
        catch (err) {
            throw err;
        }
    });
}
function getOrderId() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const count = yield order_model_1.default.count();
            return count + 1;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.default = { sendOrderByEmail, createOrder, getOrderId };
