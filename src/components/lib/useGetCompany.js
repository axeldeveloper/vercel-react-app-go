import { useState, useEffect } from "react";
import Api  from './Api';

export function useGetCompany() {
    const url = `customer?format=json`;
    const [companies, setCompanies] = useState([]);

    async function getAPI() {
        const response = await Api.get(url);
        //const response = await fetch(API_CUSTOMERS);
        //const data = await response.json();
        setCompanies(response.data);
    }
    useEffect(() => { getAPI() }, []);
    return companies ;
}