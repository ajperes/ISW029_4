import { Router } from 'express';
import { ctrl_prod } from '../controllers/prod_ctrl'

const router = Router();


// Fetch all products route
router.get('/', ctrl_prod.show)

// Specific product route
router.get('/:id', ctrl_prod.showSpecific)

// Create product route
router.post('/:id', ctrl_prod.save)
router.post('/', ctrl_prod.save)

// Delete product route
router.delete('/:id', ctrl_prod.delete)

// Update product route
router.put('/:id', ctrl_prod.update)

// Change status product route
router.put('/status/:id', ctrl_prod.changeStatus)


export default router;