import { Module } from '@nestjs/common';
import { SalasService } from './salas.service.js';
import { SalasController } from './salas.controller.js';

@Module({
  controllers: [SalasController],
  providers: [SalasService],
})
export class SalasModule {}
