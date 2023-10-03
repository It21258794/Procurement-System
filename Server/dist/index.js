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
require("dotenv").config();
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
app.use("/api/account", account_route_1.accountRoute);
app.use("/api/item", item_route_1.itemRoute);
mongoose_1.default.connect(process.env.MONGODB_URI).then(() => {
    console.log('MongoDB connected');
    app.on('error', (e) => {
        console.log(e);
    });
    app.listen(port, () => {
        console.log(`TypeScript with Express
         http://localhost:${port}/`);
    });
});
