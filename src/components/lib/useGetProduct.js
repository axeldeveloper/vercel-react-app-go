import { useState, useEffect } from "react";
import Api  from './Api';

export function useGetProduct() {
    const [data, setData] = useState([]);  
    async function getAPI() {
        const response = await Api.get(`products`);
        setData(response.data);
    }
    useEffect(() => { getAPI() }, []);
    return data ;
}