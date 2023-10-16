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
const site_service_1 = __importDefault(require("../services/site.service"));
const winston_1 = require("winston");
// Function to insert a new site
const insertSite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dto = req.body;
        const site = yield site_service_1.default.insertSite(dto);
        res.status(200).json(site);
    }
    catch (err) {
        res.status(400).json({ err: err });
    }
});
const getSite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sites = yield site_service_1.default.getSite();
        res.status(200).json(sites);
    }
    catch (err) {
        res.status(400).json({ err: winston_1.error });
    }
});
const bugestRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dto = req.body;
        const item = yield site_service_1.default.Increasebugest(dto);
        res.status(200).json(item);
    }
    catch (err) {
        res.status(400).json({ err: err });
    }
});
const getAllBudgetRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const budgetRequests = yield site_service_1.default.getAllBudgetRequests();
        if (budgetRequests && budgetRequests.length > 0) {
            res.status(200).json({ budgetRequests });
        }
        else {
            res.status(404).json({ message: 'No budget requests found' });
        }
    }
    catch (err) {
        res.status(400).json({ err: err.message });
    }
});
const budgetApprove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { site_id, budget_id, status, budget } = req.body;
        const isApproved = yield site_service_1.default.approveBudget(site_id, budget_id, status, budget);
        if (isApproved) {
            res.status(200).json({ message: 'Budget approved successfully' });
        }
        else {
            res.status(404).json({ message: 'Budget not found' });
        }
    }
    catch (err) {
        res.status(400).json({ err: err.message });
    }
});
const getAllApprovedBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const approvedBudget = yield site_service_1.default.getAllApprovedBudget();
        if (approvedBudget && approvedBudget.length > 0) {
            res.status(200).json({ approvedBudget });
        }
        else {
            res.status(404).json({ message: 'No approved budget found' });
        }
    }
    catch (err) {
        res.status(400).json({ err: err.message });
    }
});
const budgetReject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const isDeleted = yield site_service_1.default.rejectBudget(id); // Modify this to match your actual service function
        if (isDeleted) {
            res.status(200).json({ message: 'Budget request deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Budget request not found' });
        }
    }
    catch (err) {
        res.status(400).json({ err: err.message });
    }
});
exports.default = { insertSite, getSite, bugestRequest, budgetReject, budgetApprove, getAllApprovedBudget, getAllBudgetRequests };
