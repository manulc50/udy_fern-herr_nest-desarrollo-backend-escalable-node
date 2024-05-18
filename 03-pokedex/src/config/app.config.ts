
export const EnvConfiguration = () => ({
    // Normlamente, siempre suele venir definida esta variable de entorno "NODE_ENV", pero, por si acaso, si no existe, la establecemos a "dev". 
    environment: process.env.NODE_ENV || 'dev',
    mongoDBUrl: process.env.MONGODB_URL,
    port: process.env.PORT || 3002,
    defaultLimit: +process.env.DEFAULT_LIMIT || 7
});