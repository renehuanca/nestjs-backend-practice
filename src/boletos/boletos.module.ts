import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoletosService } from './boletos.service.js';
import { BoletosController } from './boletos.controller.js';
import { Boleto } from './entities/boleto.entity.js';
import { Funcion } from '../funciones/entities/funcion.entity.js';
import { Cliente } from '../clientes/entities/cliente.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Boleto, Funcion, Cliente])],
  controllers: [BoletosController],
  providers: [BoletosService],
})
export class BoletosModule {}
