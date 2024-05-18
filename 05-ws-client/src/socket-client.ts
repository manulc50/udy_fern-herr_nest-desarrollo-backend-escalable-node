import { Manager, Socket } from 'socket.io-client';

// Nota: Es necesario instalar la dependencia "socket.io-client" para poder conectarnos a un servidor WebSocket como cliente.

let socket: Socket;

export const connectToServer = (jwtToken: string) => {
    // Indicamos la url donde se encuenta el archivo JS para poder conectarnos a nuestro servidor WebSocket como cliente.
    //const manager = new Manager('localhost:3000/socket.io/socket.io.js');

    // Lo mismo que en el paso anterior comentado pero, además, pasamos unas cabeceras a la conexión(una de ellas es el token JWT que el
    // servidor WebSocket debe validar.
    const manager = new Manager('localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            hola: 'mundo',
            authentication: jwtToken
        }
    });

    // Si un mismo cliente vuelve a conectarse, eliminamos sus anteriores listeners para crear unos nuevos a continuación.
    socket?.removeAllListeners();

    // Se conecta con el servidor WebSocket en el namespace '/'(sala general). Nos devuelve los datos del socket de conexión.
    socket = manager.socket('/');
    //console.log({ socket });

    addListeners();
};

const addListeners = () => {
    const serverStatusSpan = document.querySelector<HTMLSpanElement>('#server-status')!;
    const clientsUl = document.querySelector<HTMLUListElement>('#clients-ul')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;

    // El método "on" es para escuchar desde el servidor y el método "emit" es para hablar con el servidor.

    // Escucha el evento "connect" del servidor WebSocket y, cuando se produzca, ejecuta la función de callback del segundo argumento de entrada.
    socket.on('connect', () => serverStatusSpan.innerHTML = 'connected');

    // Escucha el evento "disconnect" del servidor WebSocket y, cuando se produzca, ejecuta la función de callback del segundo argumento de entrada.
    socket.on('disconnect', () => serverStatusSpan.innerHTML = 'disconnected');

    // Escucha el evento "clients-updated" del servidor WebSocket
    socket.on('clients-updated', (clientsIds: string[]) => {
        const clientsLi = clientsIds.map(clientId => `<li>${ clientId }</li>`);
        clientsUl.innerHTML = clientsLi.join('');
    });

    messageForm.addEventListener('submit', event => {
        event.preventDefault();

        if(messageInput.value.trim().length === 0)
            return;

        // Emite el evento 'message-from-client' al servidor WebSocket con este objeto como payload.
        socket.emit('message-from-client', { id: 'YO!!', message: messageInput.value });

        messageInput.value = '';
    });

    socket.on('message-from-server', (payload: { fullname: string, message: string }) => {
        const messageHTML = `
            <strong>${ payload.fullname }</strong>
            <span>${ payload.message }</span>
        `;
        const li = document.createElement('li');
        li.innerHTML = messageHTML;
        messagesUl.append(li);
    });
};