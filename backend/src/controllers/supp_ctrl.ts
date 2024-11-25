import { Supplier } from '../models/Supplier';
import { Request, Response } from 'express';


export const ctrl_supp = {
    // POST /Supplier - Create Supplier
    save: async (req: Request, res: Response) => {
        try {
            let { Supp_id, Supp_name, Supp_cnpj, Supp_act } = req.body;

            const supplier = await Supplier.create({
                Supp_id: Supp_id === -1 ? null : Supp_id,
                Supp_name,
                Supp_cnpj,
                Supp_act
            });

            return res.status(201).json(supplier);
        } catch (error) {
            console.error('ERROR: Failure to create Supplier:\n', error);
            return res.status(500).json({ error: 'ERROR: Internal server error' });
        }
    },



    // GET /Supplier - Fetch all Suppliers
    show: async (req: Request, res: Response) => {
        try {
            const suppliers = await Supplier.findAll({
                attributes: ['Supp_id', 'Supp_name', 'Supp_cnpj', 'Supp_act']
            })

            return res.status(200).json(suppliers);
        } catch (error) {
            console.error('ERROR: Failure to fetch Suppliers with suppliers:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },



    // GET /:id - Specific Supplier
    showSpecific: async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const supplier = await Supplier.findByPk(id)
            if (!supplier) {
                return res.status(404).json({ message: 'ERROR: Supplier not found' });
            }

            return res.status(200).json(supplier)
        } catch (error) {
            return res.status(400).json({ error: 'ERROR: Failure to find Supplier', details: error.message });
        }
    },



    // PUT /supplier/:id - Update Supplier
    update: async (req: Request, res: Response) => {
        const { id } = req.params;
        let {
            Supp_name, Supp_cnpj, Supp_act,
        } = req.body;

        try {
            // Verify if Supplier exists
            const existingSupplier = await Supplier.findByPk(id);
            if (!existingSupplier) {
                return res.status(404).json({ error: "ERROR: Supplier not found" });
            }

            // Only update affected Suppliers
            const updatedSupplierData = {
                Supp_name: Supp_name || existingSupplier.Supp_name,
                Supp_cnpj: Supp_cnpj || existingSupplier.Supp_cnpj,
                Supp_act: Supp_act !== undefined ? Supp_act : existingSupplier.Supp_act
            };

            // Update Supplier
            const [updated] = await Supplier.update(updatedSupplierData, {
                where: { Supp_id: id }
            });

            if (updated) {
                const SupplierUpdate = await Supplier.findOne({ where: { Supp_id: id } });
                return res.status(200).json(SupplierUpdate);
            } else {
                return res.status(400).json({ error: "ERROR: No update done" });
            }
        } catch (error) {
            console.error('ERROR: Failure to update Supplier', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },



    //
    delete: async (req: Request, resp: Response) => {
        const { id } = req.params
        try {
            const deleted = await Supplier.destroy({ where: { Supp_id: id } });
            return resp.status(200).json(deleted);
        }
        catch (error) {
            resp.status(400).json({ error: 'ERROR: Failed on delete supplier' })
        }
    },



    // PUT /status/:id 
    changeStatus: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            // Find Supplier by ID
            const supplier = await Supplier.findByPk(id);

            if (!supplier) {
                return res.status(404).json({ error: 'ERROR: Supplier not found' });
            }

            // Switches Supplier condition
            const newBool = !supplier.Supp_act;

            // Atualizar o status no banco de dados
            await Supplier.update(
                { Supp_act: newBool },
                { where: { Supp_id: id } }
            );

            // Return new condition
            return res.status(200).json({ Supplier });
        } catch (error) {
            console.error('ERROR: Failure to update Supplier', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }


    
};
