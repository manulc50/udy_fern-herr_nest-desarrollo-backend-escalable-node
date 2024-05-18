
// Nota: Si se invoca a la función de callback con un false, el archivo no se acepta y no se pasa al controlador. 
export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
    if(!file)
        return callback(new Error('File is empty'), false);

    const validExtensions = ['jpg', 'jpeg', 'png', 'gif']; // Extensiones de archivos permitidas
    const fileExtension = file.mimetype.split('/')[1];

    // Si el formato del archivo es uno de los permitidos, se acepta el archivo.
    if(validExtensions.includes(fileExtension))
        return callback(null, true);

    callback(null, false);
};