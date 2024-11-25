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
exports.ctrl_hist_buy = void 0;
const History_Buy_1 = require("../models/History_Buy");
const Product_1 = require("../models/Product");
const Supplier_1 = require("../models/Supplier");
exports.ctrl_hist_buy = {
    // POST /History/Buy - Create Buy Transaction
    save: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let { Prod_id, Supp_id, Hist_Buy_count, Hist_Buy_date } = req.body;
            if (!Prod_id) {
                return res.status(400).json({ error: "ERROR: Missing Product" });
            }
            if (!Supp_id) {
                return res.status(400).json({ error: "ERROR: Missing Supplier" });
            }
            if (!Hist_Buy_count) {
                return res.status(400).json({ error: "ERROR: Missing Count" });
            }
            const history_buy = yield History_Buy_1.History_Buy.create({
                Prod_id,
                Supp_id,
                Hist_Buy_count,
                Hist_Buy_date
            });
            return res.status(201).json(history_buy);
        }
        catch (error) {
            console.error('ERROR: Failure to create History_Buy:\n', error);
            return res.status(500).json({ error: 'ERROR: Internal server error' });
        }
    }),
    // GET /History/Buy - Fetch all Buy Transactions
    show: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const history_buys = yield History_Buy_1.History_Buy.findAll({
                attributes: ['Hist_Buy_id', 'Prod_id', 'Supp_id', 'Hist_Buy_count', 'Hist_Buy_date'],
                include: [Product_1.Product, Supplier_1.Supplier]
            });
            return res.status(200).json(history_buys);
        }
        catch (error) {
            console.error('ERROR: Failure to fetch History_Buys', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }),
    // GET /:id - Specific History_Buy
    showSpecific: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const history_buy = yield History_Buy_1.History_Buy.findByPk(id);
            if (!history_buy) {
                return res.status(404).json({ message: 'ERROR: History_Buy not found' });
            }
            return res.status(200).json(history_buy);
        }
        catch (error) {
            return res.status(400).json({ error: 'ERROR: Failure to find History_Buy', details: error.message });
        }
    })
};
