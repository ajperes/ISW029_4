import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "../pages/product";
import Suppliers from "../pages/supplier";
import BuyLog from "../pages/history/buy";


export default function RoutesIndex(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BuyLog/>}/>

                <Route path="/history/buy" element={<BuyLog/>}/>

                <Route path="/product" element={<Products/>}/>
                <Route path="/supplier" element={<Suppliers/>}/>
            </Routes>
        </BrowserRouter>
    )
}