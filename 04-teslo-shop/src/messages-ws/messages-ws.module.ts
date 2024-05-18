import { Module } from '@nestjs/common';
import { MessagesWsService } from './messages-ws.service';
import { MessagesWsGateway } from './messages-ws.gateway';
import { AuthModule } from '../auth/auth.module';

// Este recurso ha sido generado con el comando "nest g|generate res|resource messagesWs --no-spec" de Nest CLI.
// La opción "--no-spec" es para que no genere el archivo de pruebas correspondiente.

// Nota: El "MessagesWsGateway" es como un controlador.

@Module({
  providers: [MessagesWsGateway, MessagesWsService],
  imports: [AuthModule]
})
export class MessagesWsModule {}
