import React, { useState, useEffect, useRef } from "react"
//
import { ApiException } from "../../config/apiException";
import { productServices, Product } from "../../services/prod_srv"
//
import "../../styles/product.css"
//
function noop() { }


export default function Products() {
    const [checked, setChecked] = React.useState(true);
    //
    const [products, setProducts] = useState<Product[]>([]);


    const fetchProducts = async () => {
        const res = await productServices.getAllProducts();
        if (res instanceof ApiException)
            console.log(res.message);
        else
            setProducts(res);
        console.log(res);
    }
    const createProduct = async (product: Product) => {
        const res = await productServices.createProduct(product);
        if (res instanceof ApiException)
            console.log(res.message);
        else
            fetchProducts();
        console.log(res);
    };
    const updateProduct = async (id: number, product: Product) => {
        const res = await productServices.updateProduct(id, product);
        if (res instanceof ApiException)
            console.log(res.message);
        else
            fetchProducts();
        console.log(res);
    };
    const deleteProduct = async (id: number) => {
        const res = await productServices.deleteProduct(id);
        if (res instanceof ApiException)
            console.log(res.message);
        else
            fetchProducts();
        console.log(res);
    };


    const submitProduct = async (f: any) => {
        f.preventDefault();

        const id = parseInt(f.target.Prod_id.value);

        let exist = false;
        if (!Number.isNaN(id))
            products.map(e => {
                e.Prod_id === id
                    ? exist = true
                    : noop()
            })

        const product: Product = {
            Prod_id: Number.isNaN(id) ? -1 : id,
            Prod_name: f.target.Prod_name.value,
            Prod_count: f.target.Prod_count.value === "" && !exist ? 0 : parseInt(f.target.Prod_count.value),
            Prod_price: f.target.Prod_price.value === "" && !exist ? 0 : parseFloat(f.target.Prod_price.value.replace(",", ".")),
            Prod_act: checked
        }

        /*
        alert(
            "Prod_id: " + product.Prod_id + "\n"+
            "Prod_name: " + product.Prod_name + "\n"+
            "Prod_count: " + product.Prod_count + "\n"+
            "Prod_price: " + product.Prod_price + "\n"+
            "Prod_act: " + product.Prod_act
        )
        */
        if (exist)
            updateProduct(id, product);
        else
            createProduct(product);
    }



    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <div className="page">
            <title>Product</title>
            <h1>Product</h1>
            <section>
                <a href="/product">Product</a>
                <a href="/">Historico_Compras</a>
                <a href="/supplier">Supplier</a>
            </section>
            <div className="btn" onClick={fetchProducts}>REFRESH</div>


            <form onSubmit={submitProduct}>
                <table className="prod">
                    <tbody>
                        <tr>
                            <td><input name="Prod_id" type="number" min="1" ></input></td>
                            <td><input name="Prod_name" type="text"></input></td>
                            <td><input name="Prod_count" type="number"></input></td>
                            <td><input name="Prod_price" type="text"></input></td>
                            <td><input name="Prod_act" type="checkbox" defaultChecked={checked} onChange={() => setChecked((state) => !state)}></input></td>
                            <td><input type="submit" value="OK"></input></td>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Count</td>
                            <td>Price</td>
                            <td>Active</td>
                            <td></td>
                        </tr>
                        {products.map((prod) => (
                            <tr key={prod.Prod_id}>
                                <td>{prod.Prod_id}</td>
                                <td>{prod.Prod_name}</td>
                                <td>{prod.Prod_count}</td>
                                <td>{prod.Prod_price}</td>
                                <td>{prod.Prod_act
                                    ? <span style={{ color: "green" }}>[ Y ]</span>
                                    : <span style={{ color: "red" }}>[ N ]</span>}</td>
                                <td><div className="btn" onClick={() => deleteProduct(prod.Prod_id)}>X</div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
    );
}