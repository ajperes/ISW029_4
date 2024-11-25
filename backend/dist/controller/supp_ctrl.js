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
const Supplier_1 = require("../models/Supplier");
exports.ctrl_prod = {
    // POST /Supplier - Create Supplier
    save: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let { Supp_name, Supp_cnpj, Supp_act } = req.body;
            if (!Supp_name) {
                return res.status(400).json({ error: "ERROR: Missing 'Name'" });
            }
            if (!Supp_cnpj) {
                return res.status(400).json({ error: "ERROR: Missing 'CNPJ'" });
            }
            const supplier = yield Supplier_1.Supplier.create({
                Supp_name,
                Supp_cnpj,
                Supp_act: true
            });
            return res.status(201).json(supplier);
        }
        catch (error) {
            console.error('ERROR: Failure to create Supplier:\n', error);
            return res.status(500).json({ error: 'ERROR: Internal server error' });
        }
    }),
    // GET /Supplier - Fetch all Suppliers
    show: (res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const suppliers = yield Supplier_1.Supplier.findAll({
                attributes: ['Supp_id', 'Supp_name', 'Supp_cnpj', 'Supp_act']
            });
            return res.status(200).json(suppliers);
        }
        catch (error) {
            console.error('ERROR: Failure to fetch Suppliers with suppliers:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }),
    // GET /:id - Specific Supplier
    showSpecific: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const supplier = yield Supplier_1.Supplier.findByPk(id);
            if (!supplier) {
                return res.status(404).json({ message: 'ERROR: Supplier not found' });
            }
            return res.status(200).json(supplier);
        }
        catch (error) {
            return res.status(400).json({ error: 'ERROR: Failure to find Supplier', details: error.message });
        }
    }),
    // PUT /Supplier/:id - Update Supplier
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        let { Supp_name, Supp_cnpj, Supp_act, } = req.body;
        try {
            // Verify if Supplier exists
            const existingSupplier = yield Supplier_1.Supplier.findByPk(id);
            if (!existingSupplier) {
                return res.status(404).json({ error: "ERROR: Supplier not found" });
            }
            // Only update affected Suppliers
            const updatedSupplierData = {
                Supp_name: Supp_name || existingSupplier.Supp_name,
                Supp_price: Supp_cnpj !== undefined ? Supp_cnpj : existingSupplier.Supp_cnpj,
                Supp_act: Supp_act !== undefined ? Supp_act : existingSupplier.Supp_act
            };
            // Update Supplier
            const [updated] = yield Supplier_1.Supplier.update(updatedSupplierData, {
                where: { Supp_id: id }
            });
            if (updated) {
                const SupplierUpdate = yield Supplier_1.Supplier.findOne({ where: { Supp_id: id } });
                return res.status(200).json(SupplierUpdate);
            }
            else {
                return res.status(400).json({ error: "ERROR: No update done" });
            }
        }
        catch (error) {
            console.error('ERROR: Failure to update Supplier', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }),
    // PUT /status/:id 
    changeStatus: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            // Find Supplier by ID
            const supplier = yield Supplier_1.Supplier.findByPk(id);
            if (!supplier) {
                return res.status(404).json({ error: 'ERROR: Supplier not found' });
            }
            // Switches Supplier condition
            const newBool = !supplier.Supp_act;
            // Atualizar o status no banco de dados
            yield Supplier_1.Supplier.update({ Supp_act: newBool }, { where: { Supp_id: id } });
            // Return new condition
            return res.status(200).json({ Supplier: Supplier_1.Supplier });
        }
        catch (error) {
            console.error('ERROR: Failure to update Supplier', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    })
};
