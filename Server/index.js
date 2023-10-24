"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var mongoose_1 = require("mongoose");
var account_route_1 = require("./src/routes/account.route");
var item_route_1 = require("./src/routes/item.route");
var cors_1 = require("cors");
var payment_route_1 = require("./src/routes/payment.route");
var site_route_1 = require("./src/routes/site.route");
var socket_io_1 = require("socket.io");
var order_route_1 = require("./src/routes/order.route");
var logger_1 = require("./log/logger");
var note_route_1 = require("./src/routes/note.route");
var cart_route_1 = require("./src/routes/cart.route");
require('dotenv').config();
var app = (0, express_1.default)();
var port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use('/api/account', account_route_1.accountRoute);
app.use('/api/item', item_route_1.itemRoute);
app.use('/api/payment', payment_route_1.paymentRoute);
app.use('/api/site', site_route_1.siteRoute);
app.use('/api/order', order_route_1.orderRoute);
app.use('/api/cart', cart_route_1.cartRoute);
app.use('/api/note', note_route_1.noteRoute);
var onlineUsers = [];
var addNewUser = function (userId, socketId) {
    !onlineUsers.some(function (user) { return user.userId === userId; }) &&
        onlineUsers.push({ userId: userId, socketId: socketId });
};
var removeUser = function (socketId) {
    onlineUsers = onlineUsers.filter(function (user) { return user.socketId !== socketId; });
};
var getUser = function (userId) {
    return onlineUsers.find(function (user) { return user.userId === userId; });
};
mongoose_1.default.connect(process.env.MONGODB_URI).then(function () {
    logger_1.default.info('MongoDB connected');
    app.on('error', function (err) {
        logger_1.default.error(err);
    });
    var server = app.listen(port, function () {
        logger_1.default.info("TypeScript with Express\n         http://localhost:".concat(port, "/"));
        var io = new socket_io_1.Server(server, {
            cors: {
                origin: 'http://localhost:5173',
            },
        });
        io.on('connection', function (socket) {
            socket.on("newUser", function (userId) {
                console.log("socket", userId);
                addNewUser(userId, socket.id);
            });
            socket.on("sendOrderToSupplier", function (_a) {
                var reciverId = _a.reciverId, orderItem = _a.orderItem;
                var receiver = getUser(reciverId);
                io.to(receiver.socketId).emit("getOrderfromStaff", {
                    orderItem: orderItem
                });
            });
            socket.on("sendConfirmationToStaff", function (_a) {
                var reciverId = _a.reciverId, orderId = _a.orderId, status = _a.status;
                var staff = getUser(reciverId);
                io.to(staff.socketId).emit("getConfirmationfromSupplier", {
                    orderId: orderId,
                    status: status
                });
            });
            socket.on('disconnect', function () {
                removeUser(socket.id);
            });
        });
    });
});
