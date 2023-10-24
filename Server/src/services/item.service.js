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
var item_model_1 = require("../models/item/item.model");
var account_service_1 = require("./account.service");
function insertItem(dto) {
    return __awaiter(this, void 0, void 0, function () {
        var supplier, existItem, createdItem, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    console.log(dto.supplierName);
                    return [4 /*yield*/, account_service_1.default.findItemsByUserName(dto.supplierUsername)];
                case 1:
                    supplier = _a.sent();
                    console.log(supplier);
                    if (!supplier) {
                        throw new Error('Supplier does not exist');
                    }
                    return [4 /*yield*/, item_model_1.default.findOne({
                            itemName: dto.itemName,
                            supplierName: dto.supplierUsername,
                        })];
                case 2:
                    existItem = _a.sent();
                    if (existItem) {
                        throw new Error('Item already exists');
                    }
                    console.log(dto.itemName);
                    return [4 /*yield*/, item_model_1.default.create(dto)];
                case 3:
                    createdItem = _a.sent();
                    return [2 /*return*/, createdItem];
                case 4:
                    err_1 = _a.sent();
                    throw err_1;
                case 5: return [2 /*return*/];
            }
        });
    });
}
function findItemsByName(itemName) {
    return __awaiter(this, void 0, void 0, function () {
        var items, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log('Searching for item with name:', itemName);
                    return [4 /*yield*/, item_model_1.default.find({ itemName: itemName })];
                case 1:
                    items = _a.sent();
                    console.log('Found items:', items);
                    return [2 /*return*/, items];
                case 2:
                    err_2 = _a.sent();
                    throw err_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getAllItems() {
    return __awaiter(this, void 0, void 0, function () {
        var items, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Fetching all items');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, item_model_1.default.find({})];
                case 2:
                    items = _a.sent();
                    console.log('Found items:', items);
                    return [2 /*return*/, items];
                case 3:
                    err_3 = _a.sent();
                    throw err_3;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateItem(itemId, updatedData) {
    return __awaiter(this, void 0, void 0, function () {
        var updatedItem, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, item_model_1.default.findByIdAndUpdate(itemId, updatedData, {
                            new: true,
                        })];
                case 1:
                    updatedItem = _a.sent();
                    if (!updatedItem) {
                        throw new Error('Item not found');
                    }
                    return [2 /*return*/, updatedItem];
                case 2:
                    err_4 = _a.sent();
                    throw err_4;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function deleteItem(itemId) {
    return __awaiter(this, void 0, void 0, function () {
        var deletedItem, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, item_model_1.default.findByIdAndDelete(itemId)];
                case 1:
                    deletedItem = _a.sent();
                    if (!deletedItem) {
                        throw new Error('Item not found');
                    }
                    return [2 /*return*/, true];
                case 2:
                    err_5 = _a.sent();
                    throw err_5;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    insertItem: insertItem,
    findItemsByName: findItemsByName,
    updateItem: updateItem,
    deleteItem: deleteItem,
    getAllItems: getAllItems,
};
