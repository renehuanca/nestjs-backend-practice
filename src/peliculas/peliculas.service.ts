import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Pelicula } from './entities/pelicula.entity.js';
import { Genero } from '../generos/entities/genero.entity.js';
import { CreatePeliculaDto } from './dto/create-pelicula.dto.js';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto.js';

@Injectable()
export class PeliculasService {
  constructor(
    @InjectRepository(Pelicula)
    private readonly peliculaRepository: Repository<Pelicula>,

    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
  ) {}

  async create(createPeliculaDto: CreatePeliculaDto): Promise<Pelicula> {
    const { idGeneros, ...datosPelicula } = createPeliculaDto;

    const pelicula = this.peliculaRepository.create(datosPelicula);

    if (idGeneros?.length) {
      const generos = await this.generoRepository.findBy({
        idGenero: In([...new Set(idGeneros)]),
      });

      if (generos.length !== new Set(idGeneros).size) {
        throw new NotFoundException('Uno o más géneros no existen');
      }

      pelicula.generos = generos;
    }

    return this.peliculaRepository.save(pelicula);
  }

  async findAll(): Promise<Pelicula[]> {
    return this.peliculaRepository.find({
      relations: { generos: true },
    });
  }

  async findOne(id: number): Promise<Pelicula> {
    const pelicula = await this.peliculaRepository.findOne({
      where: { idPelicula: id },
      relations: { generos: true, funciones: true },
    });

    if (!pelicula) {
      throw new NotFoundException(`La película con id ${id} no existe`);
    }

    return pelicula;
  }

  async update(
    id: number,
    updatePeliculaDto: UpdatePeliculaDto,
  ): Promise<Pelicula> {
    const pelicula = await this.findOne(id);
    Object.assign(pelicula, updatePeliculaDto);

    return this.peliculaRepository.save(pelicula);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.peliculaRepository.softDelete(id);

    return {
      mensaje: `La película con id ${id} fue eliminada correctamente`,
    };
  }

  async addGeneros(id: number, idGeneros: number[]): Promise<Pelicula> {
    const pelicula = await this.findOne(id);

    const generos = await this.generoRepository.findBy({
      idGenero: In([...new Set(idGeneros)]),
    });

    if (generos.length !== new Set(idGeneros).size) {
      throw new NotFoundException('Uno o más géneros no existen');
    }

    const generosActuales = pelicula.generos ?? [];
    pelicula.generos = [
      ...new Map(
        [...generosActuales, ...generos].map((genero) => [
          genero.idGenero,
          genero,
        ]),
      ).values(),
    ];

    return this.peliculaRepository.save(pelicula);
  }

  async removeGenero(id: number, idGenero: number): Promise<Pelicula> {
    const pelicula = await this.findOne(id);

    const genero = pelicula.generos.find(
      (item) => item.idGenero === idGenero,
    );

    if (!genero) {
      throw new NotFoundException(
        `El género con id ${idGenero} no está asignado a la película`,
      );
    }

    pelicula.generos = pelicula.generos.filter(
      (item) => item.idGenero !== idGenero,
    );

    return this.peliculaRepository.save(pelicula);
  }
}