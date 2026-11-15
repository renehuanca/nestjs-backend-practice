import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalasService } from './salas.service.js';
import { SalasController } from './salas.controller.js';
import { Sala } from './entities/sala.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Sala])],
  controllers: [SalasController],
  providers: [SalasService],
})
export class SalasModule {}
