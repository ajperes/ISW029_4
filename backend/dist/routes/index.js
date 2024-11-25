"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routeProduct_1 = __importDefault(require("./routeProduct"));
const routeSupplier_1 = __importDefault(require("./routeSupplier"));
const routeHistory_Buy_1 = __importDefault(require("./routeHistory_Buy"));
const router = (0, express_1.Router)();
// Product route
router.use('/product', routeProduct_1.default);
// Supplier route
router.use('/supplier', routeSupplier_1.default);
// History_Buy
router.use('/history/buy', routeHistory_Buy_1.default);
exports.default = router;
