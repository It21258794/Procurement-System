"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteRoute = void 0;
const express_1 = require("express");
const site_controller_1 = __importDefault(require("../controller/site.controller"));
const authGuard_1 = __importDefault(require("../utils/authGuard"));
exports.siteRoute = (0, express_1.Router)();
// Route needed
exports.siteRoute.post('/createsite', site_controller_1.default.insertSite);
exports.siteRoute.get('/getSites', authGuard_1.default, site_controller_1.default.getSite);
exports.siteRoute.post('/budgetRequest', site_controller_1.default.bugestRequest);
exports.siteRoute.put('/reject/:id', site_controller_1.default.budgetReject);
exports.siteRoute.put('/approve', site_controller_1.default.budgetApprove);
// All approved budgets
exports.siteRoute.get('/approved', site_controller_1.default.getAllApprovedBudget);
