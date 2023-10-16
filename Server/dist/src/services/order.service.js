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
const site_model_1 = __importDefault(require("../models/site/site.model"));
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
const createOrder = (orderDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = yield orderDetails.save();
        return newOrder;
    }
    catch (err) {
        throw err;
    }
});
const getOrderId = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield order_model_1.default.count();
        return count + 1;
    }
    catch (err) {
        throw err;
    }
});
const getOrderBySite = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = new Date();
        const currMonth = date.getMonth() + 1;
        const currYear = date.getFullYear();
        const year_month = currMonth + '_' + currYear;
        const site = yield site_model_1.default.findById(id);
        if (!site) {
            throw 'Site not Found';
        }
        const orderDetail = yield order_model_1.default.find({
            siteId: id,
            month_year: year_month,
        });
        return orderDetail;
    }
    catch (err) {
        throw err;
    }
});
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderItem = yield order_model_1.default.findById(id);
        return orderItem;
    }
    catch (err) {
        throw err;
    }
});
const changeOrderStatus = (orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('orderId', orderId);
        const order = yield order_model_1.default.updateOne({ _id: orderId }, { status: status });
        return { res: 'Updated' };
    }
    catch (err) {
        throw err;
    }
});
const getOrderAndBudget = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderItem = yield order_model_1.default.findById(id);
        if (!orderItem) {
            throw 'order not Found';
        }
        const budget = yield getBudgetByMonth(orderItem.siteId.toString());
        return { orderItem, budget };
    }
    catch (err) {
        throw err;
    }
});
const getBudgetByMonth = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let priceList = [];
        let totalPrice = 0;
        let remBudget = 0;
        const date = new Date();
        const currMonth = date.getMonth() + 1;
        const currYear = date.getFullYear();
        const year_month = currMonth + '_' + currYear;
        const siteItem = yield site_model_1.default.findById(id);
        if (!siteItem) {
            throw 'Site Budget not Found';
        }
        const siteBudget = siteItem.budget;
        priceList = yield order_model_1.default.find({
            siteId: id,
            month_year: year_month,
            status: 'confirmed',
        });
        console.log(priceList);
        priceList.forEach((item) => {
            totalPrice = totalPrice + item.total_cost;
        });
        remBudget = siteBudget - totalPrice;
        return {
            siteBudget: siteBudget,
            totalPrice: totalPrice,
            remBudget: remBudget,
        };
    }
    catch (err) {
        throw err;
    }
});
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield order_model_1.default.findByIdAndDelete(id);
        return { response: 'Deleted' };
    }
    catch (err) {
        throw err;
    }
});
const getOrderByMonth = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = new Date();
        const currMonth = date.getMonth() + 1;
        const currYear = date.getFullYear();
        const year_month = currMonth + '_' + currYear;
        const item = yield order_model_1.default.find({ month_year: year_month });
        return item;
    }
    catch (err) {
        throw err;
    }
});
exports.default = {
    sendOrderByEmail,
    createOrder,
    getOrderId,
    getOrderBySite,
    getOrderById,
    changeOrderStatus,
    getOrderAndBudget,
    deleteOrder,
    getOrderByMonth,
};
