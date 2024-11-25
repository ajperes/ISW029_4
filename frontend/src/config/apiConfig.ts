import axios from "axios";


const url = "http://localhost:"+ (process.env.SV_PORT || 4000);

export const Api = () =>{
    return axios.create({
        baseURL: url
    })
};


export const hostname = url;