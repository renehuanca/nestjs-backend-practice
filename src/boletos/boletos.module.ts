import { Module } from '@nestjs/common';
import { BoletosService } from './boletos.service.js';
import { BoletosController } from './boletos.controller.js';

@Module({
  controllers: [BoletosController],
  providers: [BoletosService],
})
export class BoletosModule {}
