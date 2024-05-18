import { HttpAdapter } from "../interfaces/htttp-adapter.interface";

export class PokeApiFetchAdapter implements HttpAdapter {

    async get<T>(url: string): Promise<T> {
        console.log('Con Fetch');
        
        const resp = await fetch(url);
        const data = await resp.json() as T;
        return data;
    }
}