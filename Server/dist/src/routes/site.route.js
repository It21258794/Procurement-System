"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteRoute = void 0;
const express_1 = require("express");
const site_controller_1 = __importDefault(require("../controller/site.controller"));
exports.siteRoute = (0, express_1.Router)();
exports.siteRoute.post('/createsite', site_controller_1.default.insertsite);
