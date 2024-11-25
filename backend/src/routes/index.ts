import { Router } from "express";

import { Product } from "../models/Product";
import { Supplier } from "../models/Supplier";
import { History_Buy } from "../models/History_Buy";

import routeProduct from './routeProduct'
import routeSupplier from './routeSupplier'
import routeHistory_Buy from './routeHistory_Buy'

const router = Router();

// Product route
router.use('/product', routeProduct);

// Supplier route
router.use('/supplier', routeSupplier);

// History_Buy
router.use('/history/buy', routeHistory_Buy);

export default router;