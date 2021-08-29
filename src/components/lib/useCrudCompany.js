import { useCallback } from "react";
import Api  from './Api';

export function useCrudCompany() {
   
    const create = useCallback(async data => {
        const response = await Api.post(`companies`, data);
        //setCompany(response.data);
        return response.data;
    }, []);

    const update = useCallback(async data => {
        const response = await Api.put(`companies/${data.id}`, data);
        return response.data;
    }, []);

    const destroy = useCallback(async data => {
        const response = await Api.delete(`companies/${data.id}`, data);
        return response;
    }, []);

    return {
        create, 
        update,
        destroy
    };
}