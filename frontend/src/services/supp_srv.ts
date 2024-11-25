import { Api } from "../config/apiConfig";
import { ApiException } from "../config/apiException";

const supplierURL = "/supplier";


export interface Supplier {
    Supp_id: number
    Supp_name: string
    Supp_cnpj: string
    Supp_act: boolean
}


const getAllSuppliers = async (): Promise<Supplier[] | ApiException> => {
    try {
        const { data } = await Api().get(supplierURL);


        return data;
    }
    catch (err: any) {
        return new ApiException(err.message || "ERROR: 'getAllSuppliers' failed")
    }
}
const getSupplierByID = async (id: Number): Promise<Supplier | ApiException> => {
    try {
        const { data } = await Api().get<Supplier>(
            supplierURL + "/" + id,
            {headers: {'Content-Type': 'application/json'}}
        );
        

        return data;
    }
    catch (err: any){
        return new ApiException(err.message || "ERROR: 'getSupplierByID' failed")
    }
}




const createSupplier = async (supplier: Supplier): Promise<any | ApiException> => {
    try {
        const { data } = await Api().post<any>(
            supplierURL + "/" + supplier.Supp_id,
            supplier,
            {headers: {'Content-Type': 'application/json'}}
        );

        const supp_data: Supplier = data;

        return supp_data;
    }
    catch (err: any){
        return new ApiException(err.message || "ERROR: 'createSupplier' failed")
    }
}

const updateSupplier = async (id: number, supplier: Supplier): Promise<Supplier | ApiException> => {
    try {
        const { data } = await Api().put<Supplier>(
            supplierURL + "/" + id,
            supplier,
            {headers: {'Content-Type': 'application/json'}}
        );
        
        return data;
    }
    catch (err: any){
        return new ApiException(err.message || "ERROR: 'updateSupplier' failed")
    }
}

const deleteSupplier = async (id: number): Promise<Supplier | ApiException> => {
    try {
        const { data } = await Api().delete<Supplier>(
            supplierURL + "/" + id,
            {headers: {"Content-Type": 'application/json'}}
        )

        return data;
    }
    catch (err: any){
        return new ApiException(err.message || "ERROR: 'deleteSupplier' failed")
    }
}




export const supplierServices = {
    getAllSuppliers,
    getSupplierByID,
    createSupplier,
    updateSupplier,
    deleteSupplier
}