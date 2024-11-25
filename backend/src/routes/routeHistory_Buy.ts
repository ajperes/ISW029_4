import { Router } from 'express';
import { ctrl_hist_buy } from '../controllers/hist_buy_ctrl'

const router = Router();


// Fetch all products route
router.get('/', ctrl_hist_buy.show)

// Specific product route
router.get('/:id', ctrl_hist_buy.showSpecific)

// Create product route
router.post('/:id', ctrl_hist_buy.save)
router.post('/', ctrl_hist_buy.save)

export default router;