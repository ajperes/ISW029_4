import { Api } from "../config/apiConfig";
import { ApiException } from "../config/apiException";
//
import { Product } from "./prod_srv";
import { Supplier } from "./supp_srv";

const historyBuyURL = "/history/buy";


export interface HistoryBuy { // Entry for "Histórico_Compras"
    Hist_Buy_id: number
    Prod_id: number
    Supp_id: number
    Hist_Buy_count: number
    Hist_Buy_date: string
}




const getAllBuyEntries = async (): Promise<HistoryBuy[] | ApiException> => {
    try {
        const { data } = await Api().get(historyBuyURL);


        return data;
    }
    catch (err: any) {
        return new ApiException(err.message || "ERROR: 'getAllBuyEntries' failed")
    }
}
const createBuyEntry = async (historybuy: HistoryBuy): Promise<any | ApiException> => {
    try {
        const { data } = await Api().post<any>(
            historyBuyURL + "/" + historybuy.Supp_id,
            historybuy,
            {headers: {'Content-Type': 'application/json'}}
        );

        const historybuy_data: HistoryBuy = data;

        return historybuy_data;
    }
    catch (err: any){
        return new ApiException(err.message || "ERROR: 'createBuyEntry' failed")
    }
}





export const historyBuyServices = {
    getAllBuyEntries,
    createBuyEntry
}