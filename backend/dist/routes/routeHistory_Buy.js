"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hist_buy_ctrl_1 = require("../controllers/hist_buy_ctrl");
const router = (0, express_1.Router)();
// Fetch all products route
router.get('/', hist_buy_ctrl_1.ctrl_hist_buy.show);
// Specific product route
router.get('/:id', hist_buy_ctrl_1.ctrl_hist_buy.showSpecific);
// Create product route
router.post('/:id', hist_buy_ctrl_1.ctrl_hist_buy.save);
router.post('/', hist_buy_ctrl_1.ctrl_hist_buy.save);
exports.default = router;
