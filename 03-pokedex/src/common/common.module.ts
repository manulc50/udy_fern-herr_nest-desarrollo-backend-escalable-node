import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

// Nota: Este módulo ha sido generado con el comando de Nest CLI "nest g|generate mo|module common".

@Module({
    providers: [AxiosAdapter], // En Providers porque es un injectable
    exports: [AxiosAdapter] // Para poder inyectarlo en componentes de otros módulos externos
})
export class CommonModule {}
