"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRoute = void 0;
const express_1 = require("express");
const item_controller_1 = __importDefault(require("../controller/item.controller"));
exports.itemRoute = (0, express_1.Router)();
exports.itemRoute.post('/createItem', item_controller_1.default.insertItem);
exports.itemRoute.get('/getItembyname/:itemname', item_controller_1.default.findItemsByName);
exports.itemRoute.put('/updateItem/:itemId', item_controller_1.default.updateItem);
exports.itemRoute.delete('/deleteItem/:itemId', item_controller_1.default.deleteItem);
