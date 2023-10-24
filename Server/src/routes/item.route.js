"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRoute = void 0;
var express_1 = require("express");
var item_controller_1 = require("../controller/item.controller");
// Export the itemRoute for use in your application
exports.itemRoute = (0, express_1.Router)();
// Route needed
exports.itemRoute.post('/createItem', item_controller_1.default.insertItem);
exports.itemRoute.get('/getItembyname/:itemName', item_controller_1.default.findItemsByName);
exports.itemRoute.put('/updateItem/:itemId', item_controller_1.default.updateItem);
exports.itemRoute.delete('/deleteItem/:itemId', item_controller_1.default.deleteItem);
exports.itemRoute.get('/getAllItem', item_controller_1.default.getAllItem);
