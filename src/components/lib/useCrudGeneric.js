import { useCallback } from "react";
import Api  from './Api';

export function useCrudGeneric() {
   
    const create = useCallback(async (data, route) => {
        const response = await Api.post(route, data);
        return response.data;
    }, []);

    const update = useCallback(async (data, route) => {
        const response = await Api.put(`${route}/${data.id}`, data);
        return response.data;
    }, []);

    const destroy = useCallback(async (data, route) => {
        const response = await Api.delete(`${route}/${data.id}`, data);
        return response;
    }, []);

    return {
        create, 
        update,
        destroy
    };
}