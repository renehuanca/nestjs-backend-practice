import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Sala } from './entities/sala.entity.js';
import { CreateSalaDto } from './dto/create-sala.dto.js';
import { UpdateSalaDto } from './dto/update-sala.dto.js';

@Injectable()
export class SalasService {
  constructor(
    @InjectRepository(Sala)
    private readonly salaRepository: Repository<Sala>,
  ) {}

  async create(createSalaDto: CreateSalaDto): Promise<Sala> {
    const sala = this.salaRepository.create(createSalaDto);
    return this.salaRepository.save(sala);
  }

  async findAll(): Promise<Sala[]> {
    return this.salaRepository.find();
  }

  async findOne(id: number): Promise<Sala> {
    const sala = await this.salaRepository.findOne({
      where: { idSala: id },
      relations: { funciones: true },
    });

    if (!sala) {
      throw new NotFoundException(`La sala con id ${id} no existe`);
    }

    return sala;
  }

  async update(
    id: number,
    updateSalaDto: UpdateSalaDto,
  ): Promise<Sala> {
    const sala = await this.findOne(id);
    Object.assign(sala, updateSalaDto);
    return this.salaRepository.save(sala);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.salaRepository.softDelete(id);

    return {
      mensaje: `La sala con id ${id} fue eliminada correctamente`,
    };
  }
}