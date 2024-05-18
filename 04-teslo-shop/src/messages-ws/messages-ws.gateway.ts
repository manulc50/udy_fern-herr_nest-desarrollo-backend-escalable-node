import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Server, Socket } from 'socket.io';
import { MessagesWsService } from './messages-ws.service';
import { NewMessageDto } from './dto/new-message.dto';
import { JwtPayload } from '../auth/interfaces';

// Nota: Por defecto, se habilia el endpoint '${host}:${port}/socket.io/socket.io.js' que, medinate una petición http de tipo Get, nos proporciona un archivo JS
// que debe usar cada cliente para conectarse con este servidor WebSocket.

// Nota: Si no se indica un namespace en este objeto de configuraciones, por defecto es "\". Un namespace permite identinficar una sala del servidor en concreto.
// El namespace "/" hace referencia a la sala general.
// La interfaz OnGatewayConnection nos permite saber quién se conecto al servidor y la interfaz OnGatewayDisconnect nos permite sabe quién se deconecto.
@WebSocketGateway({ cors: true }) // Habilitamos CORS
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;
  
  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly JwtService: JwtService
  ) {}

  // Cada vez que se conecta un cliente, se le proporciona un socket con un id(Nota: Si un cliente previo se vuelve a reconectar, se le da otro socket con otro id distinto al anterior).
  async handleConnection(client: Socket) {
    //console.log('Cliente conectado', client.id);

    const jwtToken = client.handshake.headers.authentication as string;
    let jwtPayload: JwtPayload
    try {
      jwtPayload = this.JwtService.verify(jwtToken);
      await this.messagesWsService.registerClient(client, jwtPayload.id);
    }
    catch(error) {
      // Si hay un error de validación del token JWT recibido desde el cliente, lo desconectamos del servidor.
      client.disconnect();
      return;
    }

    // Emite el evento 'clients-updated', con los ids de los clientes conectados hasta el momento, a todos los clientes conectados.
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
  }

  handleDisconnect(client: Socket) {
    //console.log('Cliente desconectado', client.id);
    this.messagesWsService.removeClient(client.id);

    // Emite el evento 'clients-updated', con los ids de los clientes conectados hasta el momento, a todos los clientes conectados.
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
  }

  // Este Decorador permite que el servidor WebSocket escuche eventos que lleguen desde los clientes.
  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    // Envía el evento "message-from-server" con este payload únicamente al cliente que se recibe como argumento de entrada(aquel que envío el evento "message-from-client" a este servidor).
    //client.emit('message-from-server', { fullname: 'Soy Yo!', message: payload.message || 'no-message' });

    // Envía el evento "message-from-server" con este payload a todos los cliente conectados excepto al cliente que se recibe como argumento de entrada(aquel que envío el evento "message-from-client" a este servidor).
    //client.broadcast.emit('message-from-server', { fullname: 'Soy Yo!', message: payload.message || 'no-message' });
  
    // Envía el evento "message-from-server" con este payload a todos los cliente conectados incluido el cliente que se recibe como argumento de entrada(aquel que envío el evento "message-from-client" a este servidor).
    this.wss.emit('message-from-server', {
      fullname: this.messagesWsService.getUserFullname(client.id),
      message: payload.message || 'no-message'
    });
  }
}
