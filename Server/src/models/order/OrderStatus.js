"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "pending";
    OrderStatus["CONFIRMED"] = "confirmed";
    OrderStatus["REJECTED"] = "rejected";
    OrderStatus["INCREASED"] = "increased";
    OrderStatus["ACCEPTED"] = "accepted";
    OrderStatus["ONGOING"] = "on-going";
    OrderStatus["READY"] = "ready";
    OrderStatus["ON_THE_WAY"] = "on-the-way";
    OrderStatus["CHECKED"] = "checked";
    OrderStatus["COMPLETED"] = "completed";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
