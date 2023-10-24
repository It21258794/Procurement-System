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
const account_service_1 = __importDefault(require("./account.service"));
// Function to insert a new item into the database
function insertItem(dto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(dto.supplierName);
            // Check if the supplier exists
            const supplier = yield account_service_1.default.findItemsByUserName(dto.supplierUsername);
            console.log(supplier);
            if (!supplier) {
                throw new Error('Supplier does not exist');
            }
            // Check if the item with the same name and supplier already exists
            const existItem = yield item_model_1.default.findOne({
                itemName: dto.itemName,
                supplierName: dto.supplierUsername,
            });
            if (existItem) {
                throw new Error('Item already exists');
            }
            console.log(dto.itemName);
            // Create and return the new item
            const createdItem = yield item_model_1.default.create(dto);
            return createdItem;
        }
        catch (err) {
            throw err;
        }
    });
}
// Function to find items by their name
function findItemsByName(itemName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Searching for item with name:', itemName);
            // Find items with the specified name
            const items = yield item_model_1.default.find({ itemName: itemName });
            console.log('Found items:', items);
            return items;
        }
        catch (err) {
            throw err;
        }
    });
}
// Function to get all items from the database
function getAllItems() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Fetching all items');
        try {
            // Retrieve all items from the database
            const items = yield item_model_1.default.find({});
            console.log('Found items:', items);
            return items;
        }
        catch (err) {
            throw err;
        }
    });
}
// Function to update an item by its ID
function updateItem(itemId, updatedData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Update the item with the specified ID and return the updated item
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
// Function to delete an item by its ID
function deleteItem(itemId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Delete the item with the specified ID
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
// Export all the functions as an object
exports.default = {
    insertItem,
    findItemsByName,
    updateItem,
    deleteItem,
    getAllItems,
};
