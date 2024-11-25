import { Router } from 'express';
import { ctrl_supp } from '../controllers/supp_ctrl'

const router = Router();


// Fetch all suppliers route
router.get('/', ctrl_supp.show)

// Specific supplier route
router.get('/:id', ctrl_supp.showSpecific)

// Create support route
router.post('/:id', ctrl_supp.save)
router.post('/', ctrl_supp.save)

// Delete supplier route
router.delete('/:id', ctrl_supp.delete)

// Update supplier route
router.put('/:id', ctrl_supp.update)

// Change status supplier route
router.put('/status/:id', ctrl_supp.changeStatus)


export default router;