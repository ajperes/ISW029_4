"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prod_ctrl_1 = require("../controllers/prod_ctrl");
const router = (0, express_1.Router)();
// Fetch all products route
router.get('/', prod_ctrl_1.ctrl_prod.show);
// Specific product route
router.get('/:id', prod_ctrl_1.ctrl_prod.showSpecific);
// Change status product route
router.put('/status/:id', prod_ctrl_1.ctrl_prod.changeStatus);
exports.default = router;
