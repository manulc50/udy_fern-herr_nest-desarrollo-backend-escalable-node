import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";

// Nota: Adaptador o envoltorio para el cliente http Axios. Nos permite evitar que los servicios, que necesiten realizar peticiones
// http, dependan directamente de este cliente http de terceros. De esta forma, si en un futuro se decide cambiar a otro cliente http
// de terceros, el cambio será fácil y rápido.

@Injectable()
export class AxiosAdapter implements HttpAdapter {

    private readonly axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await axios.get<T>(url);
            return data;
        }
        catch(error) {
            throw new Error("Error in Axios - Check the server logs");
        }
    }

}