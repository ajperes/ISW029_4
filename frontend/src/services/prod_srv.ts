import { Api } from "../config/apiConfig";
import { ApiException } from "../config/apiException";

const productURL = "/product";


export interface Product {
    Prod_id: number
    Prod_name: string
    Prod_count: number
    Prod_price: number
    Prod_act: boolean
}


const getAllProducts = async (): Promise<Product[] | ApiException> => {
    try {
        const { data } = await Api().get(productURL);


        return data;
    }
    catch (err: any) {
        return new ApiException(err.message || "ERROR: 'getAllProducts' failed")
    }
}
const getProductByID = async (id: Number): Promise<Product | ApiException> => {
    try {
        const { data } = await Api().get<Product>(
            productURL + "/" + id,
            {headers: {'Content-Type': 'application/json'}}
        );
        

        return data;
    }
    catch (err: any){
        return new ApiException(err.message || "ERROR: 'getProductByID' failed")
    }
}




const createProduct = async (product: any): Promise<Product | ApiException> => {
    try {
        const { data } = await Api().post<any>(
            productURL,
            product,
            {headers: {'Content-Type': 'application/json'}}
        );

        const prod_data: Product = data;


        return prod_data;
    }
    catch (err: any){
        return new ApiException(err.message || "ERROR: 'createProduct' failed")
    }
}

const updateProduct = async (id: number, product: any): Promise<Product | ApiException> => {
    try {
        const { data } = await Api().put<any>(
            productURL + "/" + id,
            product,
            {headers: {'Content-Type': 'application/json'}}
        );

        const prod_data: Product = data;
        
        return prod_data;
    }
    catch (err: any){
        return new ApiException(err.message || "ERROR: 'updateProduct' failed")
    }
}

const deleteProduct = async (id: number): Promise<Product | ApiException> => {
    try {
        const { data } = await Api().delete<Product>(
            productURL + "/" + id,
            {headers: {"Content-Type": 'application/json'}}
        )

        return data;
    }
    catch (err: any){
        return new ApiException(err.message || "ERROR: 'deleteProduct' failed")
    }
}




export const productServices = {
    getAllProducts,
    getProductByID,
    createProduct,
    updateProduct,
    deleteProduct
}