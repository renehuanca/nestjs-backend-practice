import { Module } from '@nestjs/common';
import { GenerosService } from './generos.service.js';
import { GenerosController } from './generos.controller.js';

@Module({
  controllers: [GenerosController],
  providers: [GenerosService],
})
export class GenerosModule {}
