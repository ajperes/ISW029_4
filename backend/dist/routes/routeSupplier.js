"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supp_ctrl_1 = require("../controllers/supp_ctrl");
const router = (0, express_1.Router)();
// Fetch all suppliers route
router.get('/', supp_ctrl_1.ctrl_supp.show);
// Specific supplier route
router.get('/:id', supp_ctrl_1.ctrl_supp.showSpecific);
// Create support route
router.post('/:id', supp_ctrl_1.ctrl_supp.save);
router.post('/', supp_ctrl_1.ctrl_supp.save);
// Delete supplier route
router.delete('/:id', supp_ctrl_1.ctrl_supp.delete);
// Update supplier route
router.put('/:id', supp_ctrl_1.ctrl_supp.update);
// Change status supplier route
router.put('/status/:id', supp_ctrl_1.ctrl_supp.changeStatus);
exports.default = router;
