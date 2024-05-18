import axios from "axios";
import { HttpAdapter } from "../interfaces/htttp-adapter.interface";

export class PokeApiAxiosAdapater implements HttpAdapter {
    private readonly axios = axios;

    async get<T>(url: string): Promise<T> {
        console.log('Con Axios');
        
        const { data } = await this.axios.get<T>(url);
        return data;
    }

}