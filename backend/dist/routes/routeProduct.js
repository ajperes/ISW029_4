"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prod_ctrl_1 = require("../controllers/prod_ctrl");
const router = (0, express_1.Router)();
// Fetch all products route
router.get('/', prod_ctrl_1.ctrl_prod.show);
// Specific product route
router.get('/:id', prod_ctrl_1.ctrl_prod.showSpecific);
// Create product route
router.post('/:id', prod_ctrl_1.ctrl_prod.save);
router.post('/', prod_ctrl_1.ctrl_prod.save);
// Delete product route
router.delete('/:id', prod_ctrl_1.ctrl_prod.delete);
// Update product route
router.put('/:id', prod_ctrl_1.ctrl_prod.update);
// Change status product route
router.put('/status/:id', prod_ctrl_1.ctrl_prod.changeStatus);
exports.default = router;
