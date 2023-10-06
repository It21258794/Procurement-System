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
const item_service_1 = __importDefault(require("../services/item.service"));
// Function to insert a new item
const insertItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('itemController');
        const dto = req.body;
        const item = yield item_service_1.default.insertItem(dto);
        res.status(200).json(item);
    }
    catch (err) {
        res.status(400).json({ err: err });
    }
});
// Function to find items by name
const findItemsByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemName = req.params.itemname;
        const items = yield item_service_1.default.findItemsByName(itemName);
        res.status(200).json(items);
    }
    catch (err) {
        res.status(400).json({ err: err.message });
    }
});
// Function to update an existing item
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.itemId;
        const updatedData = req.body;
        const updatedItem = yield item_service_1.default.updateItem(itemId, updatedData);
        res.status(200).json(updatedItem);
    }
    catch (err) {
        res.status(400).json({ err: err.message });
    }
});
// Function to delete an item by ID
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.itemId;
        const isDeleted = yield item_service_1.default.deleteItem(itemId);
        if (isDeleted) {
            res.status(200).json({ message: 'Item deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Item not found' });
        }
    }
    catch (err) {
        res.status(400).json({ err: err.message });
    }
});
// Function to get All items
const getAllItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('itemController');
        const items = yield item_service_1.default.getAllItems();
        res.status(200).json(items);
    }
    catch (err) {
        res.status(400).json({ err: err.message });
    }
});
// Export all the controller functions for use in routes
exports.default = {
    insertItem,
    updateItem,
    deleteItem,
    findItemsByName,
    getAllItem,
};
