"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteRoute = void 0;
var express_1 = require("express");
var site_controller_1 = require("../controller/site.controller");
var authGuard_1 = require("../utils/authGuard");
exports.siteRoute = (0, express_1.Router)();
// Route needed
exports.siteRoute.post('/createsite', site_controller_1.default.insertSite);
exports.siteRoute.get('/getSites', authGuard_1.default, site_controller_1.default.getSite);
exports.siteRoute.post('/budgetRequest', site_controller_1.default.bugestRequest);
exports.siteRoute.delete('/reject/:id', site_controller_1.default.budgetReject);
exports.siteRoute.put('/approve', site_controller_1.default.budgetApprove);
// All approved budgets
exports.siteRoute.get('/approved', site_controller_1.default.getAllApprovedBudget);
exports.siteRoute.get('/requst', site_controller_1.default.getAllBudgetRequests);
