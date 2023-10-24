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
var item_service_1 = require("../services/item.service");
// Function to insert a new item
var insertItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dto, item, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log('itemController');
                dto = req.body;
                return [4 /*yield*/, item_service_1.default.insertItem(dto)];
            case 1:
                item = _a.sent();
                res.status(200).json(item);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400).json({ err: err_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Function to find items by name
var findItemsByName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var itemName, items, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                itemName = req.params.itemname;
                return [4 /*yield*/, item_service_1.default.findItemsByName(itemName)];
            case 1:
                items = _a.sent();
                res.status(200).json(items);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400).json({ err: err_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Function to update an existing item
var updateItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var itemId, updatedData, updatedItem, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                itemId = req.params.itemId;
                updatedData = req.body;
                return [4 /*yield*/, item_service_1.default.updateItem(itemId, updatedData)];
            case 1:
                updatedItem = _a.sent();
                res.status(200).json(updatedItem);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(400).json({ err: err_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Function to delete an item by ID
var deleteItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var itemId, isDeleted, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                itemId = req.params.itemId;
                return [4 /*yield*/, item_service_1.default.deleteItem(itemId)];
            case 1:
                isDeleted = _a.sent();
                if (isDeleted) {
                    res.status(200).json({ message: 'Item deleted successfully' });
                }
                else {
                    res.status(404).json({ message: 'Item not found' });
                }
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(400).json({ err: err_4.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Function to get All items
var getAllItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var items, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log('itemController');
                return [4 /*yield*/, item_service_1.default.getAllItems()];
            case 1:
                items = _a.sent();
                res.status(200).json(items);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(400).json({ err: err_5.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Export all the controller functions for use in routes
exports.default = {
    insertItem: insertItem,
    updateItem: updateItem,
    deleteItem: deleteItem,
    findItemsByName: findItemsByName,
    getAllItem: getAllItem,
};
