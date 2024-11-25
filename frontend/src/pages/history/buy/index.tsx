import React, { useState, useEffect, useRef } from "react"
//
import { ApiException } from "../../../config/apiException";
import { historyBuyServices, HistoryBuy } from "../../../services/hist_buy_srv"
import { productServices, Product } from "../../../services/prod_srv"
import { supplierServices, Supplier } from "../../../services/supp_srv"
//
import "../../../styles/historybuy.css"
//
function noop() { }


export default function BuyLog() { // Histórico_Compras
    //
    const [buyEntries, setBuyEntries] = useState<HistoryBuy[]>([]);
    //
    const [products, setProducts] = useState<Product[]>([]);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);




    const fetchBuyEntries = async () => {
        const res = await historyBuyServices.getAllBuyEntries();
        if (res instanceof ApiException)
            console.log(res.message);
        else
            setBuyEntries(res);
        console.log(res);
        //
        const resP = await productServices.getAllProducts();
        if (resP instanceof ApiException)
            console.log(resP.message);
        else
            setProducts(resP);
        console.log(resP);
        //
        const resS = await supplierServices.getAllSuppliers();
        if (resS instanceof ApiException)
            console.log(resS.message);
        else
            setSuppliers(resS);
        console.log(resS);
    }
    const createBuyEntry = async (historybuy: HistoryBuy) => {
        const res = await historyBuyServices.createBuyEntry(historybuy);
        if (res instanceof ApiException)
            console.log(res.message);
        else
            fetchBuyEntries();
        console.log(res);
    };


    const fetchProdName = (id: number) => {
        const res = products.find((p) => (id === p.Prod_id))
        if (res === undefined)
            return "N/A";
        return res.Prod_name;
    }
    const fetchSuppName = (id: number) => {
        const res = suppliers.find((s) => (id === s.Supp_id))
        if (res === undefined)
            return "N/A";
        return res.Supp_name;
    }


    const updateProduct = async (id: number, product: Product) => {
        const res = await productServices.updateProduct(id, product);
        if (res instanceof ApiException)
            console.log(res.message);
        console.log(res);
    };



    const submitBuyEntry = async (f: any) => {
        f.preventDefault();
        let err = "";

        const id = parseInt(f.target.Hist_Buy_id.value);
        const prod = parseInt(f.target.Prod_id.value);
        const supp = parseInt(f.target.Supp_id.value);
        const count = parseInt(f.target.Hist_Buy_count.value);

        let exist = false;
        if (!Number.isNaN(id))
            buyEntries.map(e => {
                e.Prod_id === id
                    ? exist = true
                    : noop()
            })
        const product = products.find((p) => (prod === p.Prod_id))
        if (Number.isNaN(prod) || product === undefined) {
            err += "ERROR: Missing 'Product'";
        }
        if (Number.isNaN(supp) || suppliers.find((p) => (supp === p.Supp_id)) === undefined) {
            err += err == "" ? "" : "\n\n";
            err += "ERROR: Missing 'Supplier'";
        }
        if (Number.isNaN(count)) {
            err += err == "" ? "" : "\n\n";
            err += "ERROR: Missing 'Count'";
        }
        if (exist) {
            err += err == "" ? "" : "\n\n";
            err += "ERROR: Not allowed to update Log";
        }
        if (err != "") {
            alert(err);
            return console.log(err);
        }

        const buyEntry: HistoryBuy = {
            Hist_Buy_id: Number.isNaN(id) ? -1 : id,
            Prod_id: parseInt(f.target.Prod_id.value),
            Supp_id: parseInt(f.target.Supp_id.value),
            Hist_Buy_count: parseInt(f.target.Hist_Buy_count.value),
            Hist_Buy_date: new Date().toISOString().split('T')[0]
        }




        if (product !== undefined) {
            const prod_data: Product = {
                Prod_id: product.Prod_id,
                Prod_name: product.Prod_name,
                Prod_price: product.Prod_price,
                Prod_count: product.Prod_count + buyEntry.Hist_Buy_count,
                Prod_act: product.Prod_act
            }
            updateProduct(product.Prod_id, prod_data);
        }



        if (exist)
            alert("ERROR: Not allowed to update Log");
        else
            createBuyEntry(buyEntry);
    }



    useEffect(() => {
        fetchBuyEntries();
    }, []);
    return (
        <div className="page">
            <div className="btn" onClick={fetchBuyEntries}>REFRESH</div>


            <form onSubmit={submitBuyEntry}>
                <table className="prod">
                    <tbody>
                        <tr>
                            <td><input name="Hist_Buy_id" type="number" min="1" ></input></td>
                            <td><input name="Prod_id" type="number" min="1"></input></td>
                            <td><input name="Supp_id" type="number" min="1"></input></td>
                            <td><input name="Hist_Buy_count" type="text" min="1"></input></td>
                            <td><input type="submit" value="OK"></input></td>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>Product</td>
                            <td>Supplier</td>
                            <td>Count</td>
                            <td>Date</td>
                        </tr>
                        {buyEntries.map((buy) => (
                            <tr key={buy.Hist_Buy_id}>
                                <td>{buy.Hist_Buy_id}</td>
                                <td>{fetchProdName(buy.Prod_id)}</td>
                                <td>{fetchSuppName(buy.Supp_id)}</td>
                                <td>{buy.Hist_Buy_count}</td>
                                <td>{buy.Hist_Buy_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
    );
}