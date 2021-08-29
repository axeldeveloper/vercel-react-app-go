import { useState, useEffect } from "react";
import Api  from './Api';

export function useGetCompany() {
    const [companies, setCompanies] = useState([]);
    
    async function getAPI() {
        const response = await Api.get(`companies`);
        //const response = await fetch(API_CUSTOMERS);
        //const data = await response.json();
        setCompanies(response.data);
    }
    useEffect(() => { getAPI() }, []);
    return companies ;
}