import { useState, useEffect, useCallback } from "react";
import Api  from './Api';

export function useGetCustomers() {
    const [data, setData] = useState([]);
    const url = `customers?format=json`;

    async function getAPI() {
        const response = await Api.get(url);
        setData(response.data);
    }
    useEffect(() => { getAPI() }, []);
    return data ;
}


export function useGetCustomer() {
    const findById = useCallback(async (id) => {
      const response = await Api.get(`customers/${id}/`);
      return response.data;
    }, []);

    return {
        findById,
    };
}