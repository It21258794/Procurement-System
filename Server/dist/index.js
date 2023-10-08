"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const account_route_1 = require("./src/routes/account.route");
const item_route_1 = require("./src/routes/item.route");
const cors_1 = __importDefault(require("cors"));
const payment_route_1 = require("./src/routes/payment.route");
const site_route_1 = require("./src/routes/site.route");
const socket_io_1 = require("socket.io");
const order_route_1 = require("./src/routes/order.route");
const logger_1 = __importDefault(require("./log/logger"));
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.get('/', (req, res) => {
    res.send('Hello, TypeScript Express!');
});
app.use('/api/account', account_route_1.accountRoute);
app.use('/api/item', item_route_1.itemRoute);
app.use('/api/payment', payment_route_1.paymentRoute);
app.use('/api/site', site_route_1.siteRoute);
app.use('/api/order', order_route_1.orderRoute);
mongoose_1.default.connect(process.env.MONGODB_URI).then(() => {
    logger_1.default.info('MongoDB connected');
    app.on('error', (err) => {
        logger_1.default.error(err);
    });
    const server = app.listen(port, () => {
        logger_1.default.info(`TypeScript with Express
         http://localhost:${port}/`);
        const io = new socket_io_1.Server(server, {
            cors: {
                origin: 'http://localhost:5173'
            }
        });
        io.on('connection', (socket) => {
            logger_1.default.error('some has connected to socket');
            socket.on('disconnect', () => {
                logger_1.default.error('socket discconected ');
            });
        });
    });
});
