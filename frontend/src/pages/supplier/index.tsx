import React, { useState, useEffect, useRef } from "react";
//
import { ApiException } from "../../config/apiException";
import { supplierServices, Supplier } from "../../services/supp_srv";
//
import "../../styles/supplier.css";
//
function noop() { }


export default function Suppliers() {
    const [checked, setChecked] = React.useState(true);
    //
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);


    const fetchSuppliers = async () => {
        const res = await supplierServices.getAllSuppliers();
        if (res instanceof ApiException)
            console.log(res.message);
        else
            setSuppliers(res);
        console.log(res)
    };
    const createSupplier = async (supplier: Supplier) => {
        const res = await supplierServices.createSupplier(supplier);
        if (res instanceof ApiException)
            console.log(res.message);
        else
            fetchSuppliers();
        console.log(res);
    };
    const updateSupplier = async (id: number, supplier: Supplier) => {
        const res = await supplierServices.updateSupplier(id, supplier);
        if (res instanceof ApiException)
            console.log(res.message);
        else
            fetchSuppliers();
        console.log(res);
    };
    const deleteSupplier = async (id: number) => {
        const res = await supplierServices.deleteSupplier(id);
        if (res instanceof ApiException)
            console.log(res.message);
        else
            fetchSuppliers();
        console.log(res);
    };


    const submitSupply = async (f: any) => {
        f.preventDefault();

        const id = parseInt(f.target.Supp_id.value);
        
        const supplier: Supplier = {
            Supp_id: id,
            Supp_name: f.target.Supp_name.value,
            Supp_cnpj: f.target.Supp_cnpj.value,
            Supp_act: checked
        }

        let exist = false;
        suppliers.map(e => {
            e.Supp_id === id
                ? exist = true
                : noop()
        })
        if (exist)
            updateSupplier(id, supplier);
        else
            createSupplier(supplier);
    }


    useEffect(() => {
        fetchSuppliers();
    }, []);
    return (
        <div className="page">
            <div className="btn" onClick={fetchSuppliers}>REFRESH</div>


            <form onSubmit={submitSupply}>
                <table className="supp">
                    <tbody>
                        <tr>
                            <td><input name="Supp_id" type="number" min="0"></input></td>
                            <td><input name="Supp_name" type="text"></input></td>
                            <td><input name="Supp_cnpj" type="text"></input></td>
                            <td><input name="Supp_act" type="checkbox" defaultChecked={checked} onChange={() => setChecked((state) => !state)}></input></td>
                            <td><input type="submit" value="OK"></input></td>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>CNPJ</td>
                            <td>Active</td>
                            <td></td>
                        </tr>
                        {suppliers.map((supp) => (
                            <tr key={supp.Supp_id}>
                                <td>{supp.Supp_id}</td>
                                <td>{supp.Supp_name}</td>
                                <td>{supp.Supp_cnpj}</td>
                                <td>{supp.Supp_act
                                ? <span style={{color: "green"}}>[ Y ]</span> 
                                : <span style={{color: "red"}}>[ N ]</span>}</td>
                                <td><div className="btn" onClick={() => deleteSupplier(supp.Supp_id)}>X</div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
    );
}