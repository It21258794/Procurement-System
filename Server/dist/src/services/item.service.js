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
const item_model_1 = __importDefault(require("../models/item/item.model"));
const account_model_1 = __importDefault(require("../models/account/account.model"));
function insertItem(dto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const supplier = yield account_model_1.default.findById({ _id: dto.supplierId });
            if (!supplier) {
                throw new Error('Supplier does not exist');
            }
            const existItem = yield item_model_1.default.findOne({
                itemName: dto.itemName,
                supplierId: dto.supplierid,
            });
            if (existItem) {
                throw new Error('Item already exists');
            }
            const createdItem = yield item_model_1.default.create(dto);
            return createdItem;
        }
        catch (err) {
            throw err;
        }
    });
}
function findItemsByName(itemName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Searching for item with name:', itemName);
            const items = yield item_model_1.default.find({ itemName: itemName });
            console.log('Found items:', items);
            return items;
        }
        catch (err) {
            throw err;
        }
    });
}
function getAllItems() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Fetching all items');
        try {
            const items = yield item_model_1.default.find({});
            console.log('Found items:', items);
            return items;
        }
        catch (err) {
            throw err;
        }
    });
}
function updateItem(itemId, updatedData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedItem = yield item_model_1.default.findByIdAndUpdate(itemId, updatedData, {
                new: true,
            });
            if (!updatedItem) {
                throw new Error('Item not found');
            }
            return updatedItem;
        }
        catch (err) {
            throw err;
        }
    });
}
function deleteItem(itemId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedItem = yield item_model_1.default.findByIdAndDelete(itemId);
            if (!deletedItem) {
                throw new Error('Item not found');
            }
            return true;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.default = {
    insertItem,
    findItemsByName,
    updateItem,
    deleteItem,
    getAllItems,
};
