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
        const site = yield site_model_1.default.findById(id);
        if (!site) {
            throw 'Site not Found';
        }
        const orderDetail = yield order_model_1.default.find({
            items: { $elemMatch: { siteId: id } },
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
//http://localhost:8000/api/order/approveOrder
function approveOrder(orderId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedOrder = yield order_model_1.default.findByIdAndUpdate(orderId, {
                approved: true,
            });
            if (!updatedOrder) {
                throw new Error('Order not found');
            }
            return true;
        }
        catch (err) {
            throw err;
        }
    });
}
//http://localhost:8000/api/order/getAllApprovedOrders
function getAllApprovedOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const approvedOrders = yield order_model_1.default.find({ approved: true });
            return approvedOrders;
        }
        catch (err) {
            throw err;
        }
    });
}
//http://localhost:8000/api/order/rejectOrder
function rejectOrder(orderId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedOrder = yield order_model_1.default.findByIdAndDelete(orderId);
            if (!deletedOrder) {
                throw new Error('Order not found');
            }
            return true;
        }
        catch (err) {
            throw err;
        }
    });
}
const changeOrderStatus = (orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.default.updateOne({ _id: orderId }, { status: status });
        return { res: 'Updated' };
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
    rejectOrder,
    approveOrder,
    getAllApprovedOrders,
    changeOrderStatus,
};
