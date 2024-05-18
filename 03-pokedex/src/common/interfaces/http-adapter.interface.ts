
// Nota: La idea es tener un adaptador, por cada cliente http que usemos, que implemente esta interfaz. De esta forma, conseguimos
// tener un envoltorio para cada cliente http y, así, evitamos que los servicios, que necesiten realizar peticiones http, dependan
// directamente de un cliente http de terceros(Por ej, axios). De esta forma, si en un futuro se decide cambiar de cliente http, el
// el cambio será fácil y rápido.

export interface HttpAdapter {
    get<T>(url: string): Promise<T>;
}