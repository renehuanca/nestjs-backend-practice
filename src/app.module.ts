import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SalasModule } from './salas/salas.module.js';
import { GenerosModule } from './generos/generos.module.js';
import { PeliculasModule } from './peliculas/peliculas.module.js';
import { FuncionesModule } from './funciones/funciones.module.js';
import { ClientesModule } from './clientes/clientes.module.js';
import { BoletosModule } from './boletos/boletos.module.js';

@Module({
  imports: [SalasModule, GenerosModule, PeliculasModule, FuncionesModule, ClientesModule, BoletosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
