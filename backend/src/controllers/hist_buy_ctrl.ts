import { History_Buy } from '../models/History_Buy';
import { Product } from '../models/Product';
import { Supplier } from '../models/Supplier';
import { Request, Response } from 'express';


export const ctrl_hist_buy = {
    // POST /History/Buy - Create Buy Transaction
    save: async (req: Request, res: Response) => {
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

            const history_buy = await History_Buy.create({
                Prod_id,
                Supp_id,
                Hist_Buy_count,
                Hist_Buy_date
            });

            return res.status(201).json(history_buy);
        } catch (error) {
            console.error('ERROR: Failure to create History_Buy:\n', error);
            return res.status(500).json({ error: 'ERROR: Internal server error' });
        }
    },



    // GET /History/Buy - Fetch all Buy Transactions
    show: async (req: Request, res: Response) => {
        try {
            const history_buys = await History_Buy.findAll({
                attributes: ['Hist_Buy_id', 'Prod_id', 'Supp_id', 'Hist_Buy_count', 'Hist_Buy_date'],
                include: [Product, Supplier]
            })

            return res.status(200).json(history_buys);
        } catch (error) {
            console.error('ERROR: Failure to fetch History_Buys', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },



    // GET /:id - Specific History_Buy
    showSpecific: async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const history_buy = await History_Buy.findByPk(id)
            if (!history_buy) {
                return res.status(404).json({ message: 'ERROR: History_Buy not found' });
            }

            return res.status(200).json(history_buy)
        } catch (error) {
            return res.status(400).json({ error: 'ERROR: Failure to find History_Buy', details: error.message });
        }
    }
};
