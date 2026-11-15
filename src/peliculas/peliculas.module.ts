import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeliculasService } from './peliculas.service.js';
import { PeliculasController } from './peliculas.controller.js';
import { Pelicula } from './entities/pelicula.entity.js';
import { Genero } from '../generos/entities/genero.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Pelicula, Genero])],
  controllers: [PeliculasController],
  providers: [PeliculasService],
})
export class PeliculasModule {}
