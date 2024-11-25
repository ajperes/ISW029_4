"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ctrl_prod = void 0;
const Product_1 = require("../models/Product");
exports.ctrl_prod = {
    // POST /product - Create product
    save: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let { Prod_name, Prod_count, Prod_price } = req.body;
            if (!Prod_name) {
                return res.status(400).json({ error: "ERROR: Missing 'Name'" });
            }
            if (!Prod_count) {
                return res.status(400).json({ error: "ERROR: Missing 'Count'" });
            }
            if (!Prod_price) {
                return res.status(400).json({ error: "ERROR: Missing 'Price'" });
            }
            Prod_price = parseFloat(Prod_price);
            const product = yield Product_1.Product.create({
                Prod_name,
                Prod_count,
                Prod_price,
                Prod_act: true
            });
            return res.status(201).json(product);
        }
        catch (error) {
            console.error('ERROR: Failure to create product:\n', error);
            return res.status(500).json({ error: 'ERROR: Internal server error' });
        }
    }),
    // GET /product - Fetch all products
    show: (res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const products = yield Product_1.Product.findAll({
                attributes: ['Prod_id', 'Prod_name', 'Prod_count', 'Prod_price', 'Prod_act']
            });
            return res.status(200).json(products);
        }
        catch (error) {
            console.error('ERROR: Failure to fetch products with suppliers:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }),
    // GET /:id - Specific product
    showSpecific: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const product = yield Product_1.Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: 'ERROR: Product not found' });
            }
            return res.status(200).json(product);
        }
        catch (error) {
            return res.status(400).json({ error: 'ERROR: Failure to find product', details: error.message });
        }
    }),
    // PUT /product/:id - Update product
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        let { Prod_name, Prod_price, Prod_count, Prod_act, } = req.body;
        if (Prod_price) {
            Prod_price = parseFloat(Prod_price);
        }
        try {
            // Verify if product exists
            const existingProduct = yield Product_1.Product.findByPk(id);
            if (!existingProduct) {
                return res.status(404).json({ error: "ERROR: Product not found" });
            }
            // Only update affected products
            const updatedProductData = {
                Prod_name: Prod_name || existingProduct.Prod_name,
                Prod_price: Prod_price !== undefined ? Prod_price : existingProduct.Prod_price,
                Prod_count: Prod_count !== undefined ? Prod_count : existingProduct.Prod_count,
                Prod_act: Prod_act !== undefined ? Prod_act : existingProduct.Prod_act
            };
            // Update product
            const [updated] = yield Product_1.Product.update(updatedProductData, {
                where: { Prod_id: id }
            });
            if (updated) {
                const productUpdate = yield Product_1.Product.findOne({ where: { Prod_id: id } });
                return res.status(200).json(productUpdate);
            }
            else {
                return res.status(400).json({ error: "ERROR: No update done" });
            }
        }
        catch (error) {
            console.error('ERROR: Failure to update product', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }),
    // PUT /status/:id 
    changeStatus: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            // Find Product by ID
            const product = yield Product_1.Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ error: 'ERROR: Product not found' });
            }
            // Switches product condition
            const newBool = !product.Prod_act;
            // Update condition in database
            yield Product_1.Product.update({ Prod_act: newBool }, { where: { Prod_id: id } });
            // Return new condition
            return res.status(200).json({ product });
        }
        catch (error) {
            console.error('ERROR: Failure to update product', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    })
};
