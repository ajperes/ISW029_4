import { Product } from '../models/Product';
import { Request, Response } from 'express';


export const ctrl_prod = {
    // POST /product - Create product
    save: async (req: Request, res: Response) => {
        try {
            let { Prod_id, Prod_name, Prod_count, Prod_price, Prod_act } = req.body;

            
            const product = await Product.create({
                Prod_id: Prod_id === -1 ? null : Prod_id,
                Prod_name,
                Prod_count,
                Prod_price,
                Prod_act
            });

            return res.status(201).json(product);
        } catch (error) {
            console.error('ERROR: Failure to create product:\n', error);
            return res.status(500).json({ error: 'ERROR: Internal server error' });
        }
    },



    // GET /product - Fetch all products
    show: async (req: Request, res: Response) => {
        try {
            const products = await Product.findAll({
                attributes: ['Prod_id', 'Prod_name', 'Prod_count', 'Prod_price', 'Prod_act']
            })

            return res.status(200).json(products);
        } catch (error) {
            console.error('ERROR: Failure to fetch products with suppliers:', error);
            return res.status(500).json({ error: 'ERROR: Internal server error' });
        }
    },



    // GET /:id - Specific product
    showSpecific: async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const product = await Product.findByPk(id)
            if (!product) {
                return res.status(404).json({ message: 'ERROR: Product not found' });
            }

            return res.status(200).json(product)
        } catch (error) {
            return res.status(400).json({ error: 'ERROR: Failure to find product', details: error.message });
        }
    },



    // PUT /product/:id - Update product
    update: async (req: Request, res: Response) => {
        const { id } = req.params;
        let {
            Prod_name, Prod_price, Prod_count, Prod_act,
        } = req.body;

        try {
            // Verify if product exists
            const existingProduct = await Product.findByPk(id);
            if (!existingProduct) {
                return res.status(404).json({ error: "ERROR: Product not found" });
            }

            

            // Only update affected products
            const updatedProductData = {
                Prod_name: Prod_name || existingProduct.Prod_name,
                Prod_count: Prod_count === 0 ? 0 : Prod_count || existingProduct.Prod_count,
                Prod_price: Prod_price === 0 ? 0 : Prod_price || existingProduct.Prod_price,
                Prod_act: Prod_act !== undefined ? Prod_act : existingProduct.Prod_act
            };


            // Update product
            const [updated] = await Product.update(updatedProductData, {
                where: { Prod_id: id }
            });

            if (updated) {
                const productUpdate = await Product.findOne({ where: { Prod_id: id } });
                return res.status(200).json(productUpdate);
            } else {
                return res.status(400).json({ error: "ERROR: No update done" });
            }
        } catch (error) {
            console.error('ERROR: Failure to update product', error);
            return res.status(500).json({ error: 'ERROR: Internal server error' });
        }
    },



    // DELETE /product/:id - Delete product
    delete: async (req: Request, resp: Response) => {
        const { id } = req.params;
        console.log(id);
        try {
            const deleted = await Product.destroy({ where: { Prod_id: id } });
            return resp.status(200).json(deleted);
        }
        catch (error) {
            resp.status(400).json({ error: 'ERROR: Failed on delete product' })
        }
    },



    // PUT /status/:id 
    changeStatus: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            // Find Product by ID
            const product = await Product.findByPk(id);

            if (!product) {
                return res.status(404).json({ error: 'ERROR: Product not found' });
            }

            // Switches product condition
            const newBool = !product.Prod_act;

            // Update condition in database
            await Product.update(
                { Prod_act: newBool },
                { where: { Prod_id: id } }
            );

            // Return new condition
            return res.status(200).json({ product });
        } catch (error) {
            console.error('ERROR: Failure to update product', error);
            return res.status(500).json({ error: 'ERROR: Internal server error' });
        }
    }
};
