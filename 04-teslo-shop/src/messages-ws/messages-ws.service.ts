import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

// Tipo de dato para objectos que tienen una propiedad "id" que es un string y su valor es un objeto con un Socket y un usuario.
interface ConnectedClients {
    [id: string]: { socket: Socket, user: User };
}

@Injectable()
export class MessagesWsService {

    private connectedClients: ConnectedClients = {};

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async registerClient(client: Socket, userId: string) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if(!user)
            throw new Error(`User with id '${ userId }' not found`);

        if(!user.isActive)
            throw new Error(`User with id '${ userId }' is not active`);

        // Comprueba si ya existe un socket previo asociado al usuario y, en caso afirmativo, desconecta ese socket para crear uno nuevo a continuación.
        // Es decir, solo se permite una conexión por usuario. 
        this.checkUserConnection(user);

        this.connectedClients[client.id] = { socket: client, user };
    }

    removeClient(clientId: string) {
        delete this.connectedClients[clientId];
    }
    
    getConnectedClients(): string[] {
        return Object.keys(this.connectedClients);
    }

    getUserFullname(clientId: string) {
        return this.connectedClients[clientId].user.fullname;
    }

    private checkUserConnection(user: User) {
        for(const clientId of this.getConnectedClients()) {
            const connectedClient = this.connectedClients[clientId]; 
            if(connectedClient.user.id === user.id) {
                connectedClient.socket.disconnect();
                break;
            }
        }
    }
}
