import { useState, useEffect, useCallback } from "react";
import Api  from './Api';

export function useGetBarbers() {
    const [data, setData] = useState([]);  
    async function getAPI() {
        const response = await Api.get(`barbers`);
        setData(response.data);
    }
    useEffect(() => { getAPI() }, []);
    return data ;
}


export function useGetBarber() {
    const findById = useCallback(async (id) => {
      const response = await Api.get(`barbers/${id}/`);
      return response.data;
    }, []);
  
    return {
        findById,
    };
}