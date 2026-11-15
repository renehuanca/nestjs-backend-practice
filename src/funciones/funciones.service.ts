import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Funcion } from './entities/funcion.entity.js';
import { Sala } from '../salas/entities/sala.entity.js';
import { Pelicula } from '../peliculas/entities/pelicula.entity.js';
import { CreateFuncionDto } from './dto/create-funcion.dto.js';
import { UpdateFuncionDto } from './dto/update-funcion.dto.js';

@Injectable()
export class FuncionesService {
  constructor(
    @InjectRepository(Funcion)
    private readonly funcionRepository: Repository<Funcion>,

    @InjectRepository(Sala)
    private readonly salaRepository: Repository<Sala>,

    @InjectRepository(Pelicula)
    private readonly peliculaRepository: Repository<Pelicula>,
  ) {}

  async create(createFuncionDto: CreateFuncionDto): Promise<Funcion> {
    const { idSala, idPelicula, ...datosFuncion } = createFuncionDto;

    const sala = await this.salaRepository.findOne({
      where: { idSala },
    });

    if (!sala) {
      throw new NotFoundException(`La sala con id ${idSala} no existe`);
    }

    const pelicula = await this.peliculaRepository.findOne({
      where: { idPelicula },
    });

    if (!pelicula) {
      throw new NotFoundException(
        `La película con id ${idPelicula} no existe`,
      );
    }

    const funcion = this.funcionRepository.create({
      ...datosFuncion,
      sala,
      pelicula,
    });

    return this.funcionRepository.save(funcion);
  }

  async findAll(): Promise<Funcion[]> {
    return this.funcionRepository.find({
      relations: { sala: true, pelicula: true },
    });
  }

  async findOne(id: number): Promise<Funcion> {
    const funcion = await this.funcionRepository.findOne({
      where: { idFuncion: id },
      relations: { sala: true, pelicula: true, boletos: true },
    });

    if (!funcion) {
      throw new NotFoundException(`La función con id ${id} no existe`);
    }

    return funcion;
  }

  async update(
    id: number,
    updateFuncionDto: UpdateFuncionDto,
  ): Promise<Funcion> {
    const funcion = await this.findOne(id);
    const { idSala, idPelicula, ...datosFuncion } = updateFuncionDto;

    Object.assign(funcion, datosFuncion);

    if (idSala !== undefined) {
      const sala = await this.salaRepository.findOne({
        where: { idSala },
      });

      if (!sala) {
        throw new NotFoundException(`La sala con id ${idSala} no existe`);
      }

      funcion.sala = sala;
    }

    if (idPelicula !== undefined) {
      const pelicula = await this.peliculaRepository.findOne({
        where: { idPelicula },
      });

      if (!pelicula) {
        throw new NotFoundException(
          `La película con id ${idPelicula} no existe`,
        );
      }

      funcion.pelicula = pelicula;
    }

    return this.funcionRepository.save(funcion);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.funcionRepository.softDelete(id);

    return {
      mensaje: `La función con id ${id} fue eliminada correctamente`,
    };
  }
}
