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
var nodemailer_1 = require("nodemailer");
var order_model_1 = require("../models/order/order.model");
var site_model_1 = require("../models/site/site.model");
var sendOrderByEmail = function (order_id, email, pdf) {
    var msg = "Your payment receipt on ".concat(order_id);
    if (pdf == null) {
        msg = 'You have recieved an Order From Codex Cunstruction Company';
    }
    try {
        console.log(process.env.EMAIL_PASS);
        var transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });
        var mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: "Order No : ".concat(order_id),
            text: msg,
            attachments: [
                {
                    filename: 'attachment.pdf',
                    content: pdf,
                    contentType: 'application/pdf',
                    encoding: 'base64'
                }
            ]
        };
        transporter.sendMail(mailOptions, function (error, info) {
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
var createOrder = function (orderDetails) { return __awaiter(void 0, void 0, void 0, function () {
    var newOrder, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderDetails.save()];
            case 1:
                newOrder = _a.sent();
                return [2 /*return*/, newOrder];
            case 2:
                err_1 = _a.sent();
                throw err_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
var getOrderId = function () { return __awaiter(void 0, void 0, void 0, function () {
    var count, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order_model_1.default.count()];
            case 1:
                count = _a.sent();
                return [2 /*return*/, count + 1];
            case 2:
                err_2 = _a.sent();
                throw err_2;
            case 3: return [2 /*return*/];
        }
    });
}); };
var getOrderBySite = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var date, currMonth, currYear, year_month, site, orderDetail, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                date = new Date();
                currMonth = date.getMonth() + 1;
                currYear = date.getFullYear();
                year_month = currMonth + '_' + currYear;
                return [4 /*yield*/, site_model_1.default.findById(id)];
            case 1:
                site = _a.sent();
                if (!site) {
                    throw 'Site not Found';
                }
                return [4 /*yield*/, order_model_1.default.find({
                        siteId: id,
                        month_year: year_month,
                    })];
            case 2:
                orderDetail = _a.sent();
                return [2 /*return*/, orderDetail];
            case 3:
                err_3 = _a.sent();
                throw err_3;
            case 4: return [2 /*return*/];
        }
    });
}); };
var getOrderById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var orderItem, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order_model_1.default.findById(id)];
            case 1:
                orderItem = _a.sent();
                return [2 /*return*/, orderItem];
            case 2:
                err_4 = _a.sent();
                throw err_4;
            case 3: return [2 /*return*/];
        }
    });
}); };
var changeOrderStatus = function (orderId, status) { return __awaiter(void 0, void 0, void 0, function () {
    var order, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log('orderId', orderId);
                return [4 /*yield*/, order_model_1.default.updateOne({ _id: orderId }, { status: status })];
            case 1:
                order = _a.sent();
                return [2 /*return*/, { res: 'Updated' }];
            case 2:
                err_5 = _a.sent();
                throw err_5;
            case 3: return [2 /*return*/];
        }
    });
}); };
var getOrderAndBudget = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var orderItem, budget, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, order_model_1.default.findById(id)];
            case 1:
                orderItem = _a.sent();
                if (!orderItem) {
                    throw 'order not Found';
                }
                return [4 /*yield*/, getBudgetByMonth(orderItem.siteId.toString())];
            case 2:
                budget = _a.sent();
                return [2 /*return*/, { orderItem: orderItem, budget: budget }];
            case 3:
                err_6 = _a.sent();
                throw err_6;
            case 4: return [2 /*return*/];
        }
    });
}); };
var getBudgetByMonth = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var priceList, totalPrice_1, remBudget, date, currMonth, currYear, year_month, siteItem, siteBudget, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                priceList = [];
                totalPrice_1 = 0;
                remBudget = 0;
                date = new Date();
                currMonth = date.getMonth() + 1;
                currYear = date.getFullYear();
                year_month = currMonth + '_' + currYear;
                return [4 /*yield*/, site_model_1.default.findById(id)];
            case 1:
                siteItem = _a.sent();
                if (!siteItem) {
                    throw 'Site Budget not Found';
                }
                siteBudget = siteItem.budget;
                return [4 /*yield*/, order_model_1.default.find({
                        siteId: id,
                        month_year: year_month,
                        status: 'confirmed',
                    })];
            case 2:
                priceList = _a.sent();
                console.log(priceList);
                priceList.forEach(function (item) {
                    totalPrice_1 = totalPrice_1 + item.total_cost;
                });
                remBudget = siteBudget - totalPrice_1;
                return [2 /*return*/, {
                        siteBudget: siteBudget,
                        totalPrice: totalPrice_1,
                        remBudget: remBudget,
                    }];
            case 3:
                err_7 = _a.sent();
                throw err_7;
            case 4: return [2 /*return*/];
        }
    });
}); };
var deleteOrder = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var item, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order_model_1.default.findByIdAndDelete(id)];
            case 1:
                item = _a.sent();
                return [2 /*return*/, { response: 'Deleted' }];
            case 2:
                err_8 = _a.sent();
                throw err_8;
            case 3: return [2 /*return*/];
        }
    });
}); };
var getOrderByMonth = function () { return __awaiter(void 0, void 0, void 0, function () {
    var date, currMonth, currYear, year_month, item, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                date = new Date();
                currMonth = date.getMonth() + 1;
                currYear = date.getFullYear();
                year_month = currMonth + '_' + currYear;
                return [4 /*yield*/, order_model_1.default.find({ month_year: year_month })];
            case 1:
                item = _a.sent();
                return [2 /*return*/, item];
            case 2:
                err_9 = _a.sent();
                throw err_9;
            case 3: return [2 /*return*/];
        }
    });
}); };
function getAllOrders() {
    return __awaiter(this, void 0, void 0, function () {
        var orderRequests, err_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, order_model_1.default.find()];
                case 1:
                    orderRequests = _a.sent();
                    return [2 /*return*/, orderRequests];
                case 2:
                    err_10 = _a.sent();
                    throw err_10;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    getAllOrders: getAllOrders,
    sendOrderByEmail: sendOrderByEmail,
    createOrder: createOrder,
    getOrderId: getOrderId,
    getOrderBySite: getOrderBySite,
    getOrderById: getOrderById,
    changeOrderStatus: changeOrderStatus,
    getOrderAndBudget: getOrderAndBudget,
    deleteOrder: deleteOrder,
    getOrderByMonth: getOrderByMonth,
};
