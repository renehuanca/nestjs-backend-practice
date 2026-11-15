import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Genero } from './entities/genero.entity.js';
import { CreateGeneroDto } from './dto/create-genero.dto.js';
import { UpdateGeneroDto } from './dto/update-genero.dto.js';

@Injectable()
export class GenerosService {
  constructor(
    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
  ) {}

  async create(createGeneroDto: CreateGeneroDto): Promise<Genero> {
    const genero = this.generoRepository.create(createGeneroDto);
    return this.generoRepository.save(genero);
  }

  async findAll(): Promise<Genero[]> {
    return this.generoRepository.find();
  }

  async findOne(id: number): Promise<Genero> {
    const genero = await this.generoRepository.findOne({
      where: { idGenero: id },
      relations: { peliculas: true },
    });

    if (!genero) {
      throw new NotFoundException(`El género con id ${id} no existe`);
    }

    return genero;
  }

  async update(
    id: number,
    updateGeneroDto: UpdateGeneroDto,
  ): Promise<Genero> {
    const genero = await this.findOne(id);
    Object.assign(genero, updateGeneroDto);
    return this.generoRepository.save(genero);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.generoRepository.softDelete(id);

    return {
      mensaje: `El género con id ${id} fue eliminado correctamente`,
    };
  }
}